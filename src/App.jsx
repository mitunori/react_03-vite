import { useState, useEffect } from "react";
import "./App.css";
// firebaseを使うために用意されているおまじないを読み込む
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db, auth } from "./firebase"; //.envに書かれているfirebaseに接続するためのもの
import Add from "./Add";

function App() {
  //1. useStateを準備して、データを取得できるようにする🤗
  const [data, setData] = useState([
    {
      id: "",
      title: "",
      title2: "",
    },
  ]);
  console.log(data, "useStateの箱の中身");

  //3. 登録用のuseStateを準備します🤗
  const [titleValue, setTitleValue] = useState("");
  // 追加したinput用
  const [title2Value, setTitle2Value] = useState("");

  // 2. useEffectを使って画面表示の際にfirebaseからデータを取得する
  useEffect(() => {
    //2.1 query=コレクション(firebaseのデータが入る箱のこと)
    const q = query(collection(db, "group")); //データにアクセス

    // 2.2
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setData(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          title2: doc.data().title2,
        }))
      );
    });
    return () => unsub();
  }, []);

  //4. inputのonChangeのイベントを記述🤗
  const handleInputChange = (e) => {
    console.log(e, "event");
    console.log(e.target, "event target");
    setTitleValue(e.target.value);
  };

  const handleInputChange2 = (e) => {
    console.log(e, "event");
    console.log(e.target, "event target");
    setTitle2Value(e.target.value);
  };

  //5. 送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
        title2: title2Value,
      }
    );

    // 文字を空にします🤗
    setTitleValue("");
    setTitle2Value("");
  };

  return (
    <div className="App">
      {/* この下に書きます */}
      <h1>REACT</h1>
      {/* この上に書きます */}

      {/* 表示のロジック */}
      {data.map((item, index) => (
        <div key={index}>
          <div>{index}</div>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.title2}</div>
        </div>
      ))}

      <hr />
      {/* 登録の処理 */}
      {/* <input type="text" value={titleValue} onChange={handleInputChange} /> */}
      {/* 送信のボタンを記述 */}
      {/* <button onClick={addData}>送信</button> */}

      <Add
        addData={addData}
        titleValue={titleValue}
        title2Value={title2Value}
        handleInputChange={handleInputChange}
        handleInputChange2={handleInputChange2}
      />
    </div>
  );
}

export default App;
