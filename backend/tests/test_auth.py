import pytest


@pytest.mark.asyncio
async def test_register(client):
    response = await client.post("/auth/register", json={
        "email": "new@example.com",
        "password": "password123",
        "full_name": "New User",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "new@example.com"
    assert data["full_name"] == "New User"
    assert "id" in data


@pytest.mark.asyncio
async def test_register_duplicate_email(client):
    user = {"email": "dup@example.com", "password": "pass123", "full_name": "Dup"}
    await client.post("/auth/register", json=user)
    response = await client.post("/auth/register", json=user)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_login(client):
    await client.post("/auth/register", json={
        "email": "login@example.com",
        "password": "password123",
        "full_name": "Login User",
    })
    response = await client.post("/auth/login", json={
        "email": "login@example.com",
        "password": "password123",
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_invalid_credentials(client):
    response = await client.post("/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "wrong",
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me(auth_client):
    response = await auth_client.get("/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert "email" in data
    assert "full_name" in data


@pytest.mark.asyncio
async def test_get_me_unauthorized(client):
    response = await client.get("/auth/me")
    assert response.status_code == 401
