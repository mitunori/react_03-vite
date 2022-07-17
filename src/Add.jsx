import React from "react";

const Add = ({
  addData,
  handleInputChange,
  handleInputChange2,
  titleValue,
  title2Value,
}) => {
  return (
    <div>
      {/* hrタグは線 */}
      <hr />
      <h1>登録の処理</h1>
      {/* インプットの文字をこのパーツに渡して表示をしている */}
      <p>{titleValue}</p>

      {/* 入力させるinputタグを記述 */}
      <input type="text" value={titleValue} onChange={handleInputChange} />
      <input type="text" value={title2Value} onChange={handleInputChange2} />

      {/* 送信のボタンを記述 */}
      <button onClick={addData}>送信</button>
    </div>
  );
};

export default Add;
