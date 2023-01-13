import "./Question.css";

export default function Question(props) {
  const object = {
    correct: props.correct,
    incorrect: props.incorrect,
    isHeld: props.isHeld,
  };

  function renderOptions() {
    const array = [...props.incorrect, props.correct];

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };

    shuffleArray(array);
    return array.map((element,index) => {
      return (
        <div className="single_option_container">
          <input
            value={element}
            type="radio"
            id={props.id}
            name={`nigga ${props.name}`}
            className="click_options"
            onChange={(e) => props.handleOptions(props.id, props.question)}
          />
          <label htmlFor={element}>{element}</label>
        </div>
      );
    });
  }

  return (
    <div className="question_container">
      <h2 className="question_title">{props.question}</h2>
      <div className="options_container">{renderOptions()}</div>
    </div>
  );
}