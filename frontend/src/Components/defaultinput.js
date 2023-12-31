import { React } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const API_URL = "https://worksheetcreator-32445e06bf4d.herokuapp.com";
//const API_URL = "http://127.0.0.1:5000";

export const DefaultInput = ({
  handleResponse,
  info,
  handleInfo,
  isLoading,
  handleLoading,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(info);

    handleLoading(true);

    const response = await fetch(`${API_URL}/handle-prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    console.log(data);
    handleResponse(JSON.parse(data.reply));
    resetInfo();
    handleLoading(false);
  };

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    handleInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  /*
  const randomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };


  const randomGenerator = () => {
    handleInfo({
      type: "default",
      grade: randomElement(gradeLevels),
      topic: randomElement(topics),
      length: randomElement(Array.from({ length: 5 }, (_, index) => index + 1)),
      hint: false,
      questionType: randomElement(questionTypes),
      answerKey: false,
    });
  };
*/
  const resetInfo = () => {
    handleInfo({
      type: "default",
      grade: "",
      topic: info?.topic,
      length: "",
      hint: false,
      questionType: "",
      answerKey: false,
    });
  };

  const topics = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Algebra 1",
    "Geometry",
    "Algebra 2",
  ];

  const gradeLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const questionTypes = ["Word Problems", "Computational Problems"];

  const styles = {
    dropdowns: { m: 1, width: 150, marginLeft: 0, borderRadius: 1 },
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <Box sx={{ minWidth: 120, m: 1 }}>
        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel id="grade-level">Grade Level</InputLabel>
          <Select
            labelId="grade-level"
            id="demo-simple-select"
            value={info.grade}
            name="grade"
            label="grade"
            onChange={handleInfoChange}
          >
            {gradeLevels.map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel>Topic</InputLabel>
          <Select
            labelId="topic"
            id="topic"
            value={info.topic}
            name="topic"
            label="topic"
            onChange={handleInfoChange}
          >
            {topics.map((topic, index) => (
              <MenuItem key={index} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel id="length">Length</InputLabel>
          <Select
            labelId="length"
            id="length"
            value={info.length}
            name="length"
            label="length"
            onChange={handleInfoChange}
          >
            {Array.from({ length: 20 }, (_, index) => index + 1).map(
              (length, index) => (
                <MenuItem key={index} value={length}>
                  {length} questions
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel id="hint">Hint</InputLabel>
          <Select
            labelId="hint"
            id="hint"
            value={info.hint}
            name="hint"
            label="hint"
            onChange={handleInfoChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel id="questionType">Question Type</InputLabel>
          <Select
            labelId="questionType"
            id="questionType"
            value={info.questionType}
            name="questionType"
            label="questionType"
            onChange={handleInfoChange}
          >
            {questionTypes.map((question, index) => (
              <MenuItem key={index} value={question}>
                {question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required sx={styles.dropdowns}>
          <InputLabel id="answerKey">Answer Key</InputLabel>
          <Select
            labelId="answerKey"
            id="answerKey"
            value={info.answerKey}
            name="answerKey"
            label="answerKey"
            onChange={handleInfoChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/*
<button
        type="submit"
        className="all-buttons lucky-generate-button"
        disabled={isLoading}
        style={
          isLoading ? { backgroundColor: "gray", cursor: "not-allowed" } : null
        }
        onClick={randomGenerator}
      >
        I'm Feeling Lucky
      </button>
            */}

      <button
        type="submit"
        className="all-buttons default-generate-button"
        disabled={isLoading}
        style={
          isLoading ? { backgroundColor: "gray", cursor: "not-allowed" } : null
        }
      >
        Generate
      </button>
    </form>
  );
};
