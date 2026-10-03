from app.services.data_service import parse_csv, validate_dataset


def test_parse_csv_valid():
    content = b"name,age,city\nAlice,30,NYC\nBob,25,LA"
    result = parse_csv(content)
    assert result["columns"] == ["name", "age", "city"]
    assert result["row_count"] == 2
    assert len(result["data"]) == 2
    assert result["data"][0]["name"] == "Alice"
    assert result["data"][1]["city"] == "LA"


def test_parse_csv_single_row():
    content = b"col1,col2\nval1,val2"
    result = parse_csv(content)
    assert result["row_count"] == 1
    assert result["columns"] == ["col1", "col2"]


def test_parse_csv_empty():
    content = b"col1,col2\n"
    result = parse_csv(content)
    assert result["columns"] == ["col1", "col2"]
    assert result["row_count"] == 0


def test_validate_dataset_valid():
    data = [{"a": 1, "b": 2}, {"a": 3, "b": 4}]
    assert validate_dataset(data) is True


def test_validate_dataset_empty():
    assert validate_dataset([]) is False


def test_validate_dataset_invalid_type():
    assert validate_dataset("not a list") is False


def test_validate_dataset_invalid_rows():
    assert validate_dataset(["not", "dicts"]) is False
