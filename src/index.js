import React from "react";
import ReactDOM from "react-dom";
import "./indexTemp.css";
import "./dropDown.css";
const Output = () => {
  const apiLang = {
    "Year I": "yr1",
    "Year II": "yr2",
    "Year III": "yr3",
    "Year IV": "yr4",
    "Sem 1": "sem1",
    "Sem 2": "sem2",
    Mid: "mid",
    Sem: "sem",
  };

  const [stuObj, setStuObj] = React.useState([]);
  const [id1, setId1] = React.useState("");
  const [tempId, setTempId] = React.useState("");
  const [year, setYear] = React.useState("Year");
  const [sem, setSem] = React.useState("Semester");
  const [exam, setExam] = React.useState("Exam");
  const [subject, setSubject] = React.useState([]);
  const [name, setName] = React.useState([]);
  React.useEffect(() => {
    const getMarksData = async () => {
      const res = await fetch(
        `https://cse-snist-b.herokuapp.com/stuData/${id1}`
      );
      const data = await res.json();
      var reqData = data[0][apiLang[year]][apiLang[sem]][apiLang[exam]];
      setName(data[0]["name"]);
      setSubject(Object.keys(reqData));
      setStuObj(reqData);
    };
    getMarksData();
  }, [id1, year, exam, sem]);
  const Name = () => {
    if (subject.length) {
      return (
        <h4 style={{ marginLeft: "15px", marginTop: "15px" }}>NAME : {name}</h4>
      );
    } else {
      return <></>;
    }
  };
  const TableRow = ({ key1, value }) => {
    return (
      <tr>
        <td>{key1}</td>
        <td>{value}</td>
      </tr>
    );
  };

  const TableData = () => {
    if (subject.length) {
      return (
        <div className="content">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {subject.map((e) => {
                return (
                  <TableRow
                    key={stuObj["_id"] + e}
                    key1={e}
                    value={stuObj[e]}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <h4 style={{ marginLeft: "15px", marginTop: "15px" }}>
          <small>Enter valid id .......</small>
        </h4>
      );
    }
  };

  return (
    <div className="container-login100">
      <div className="wrap-login100">
        <img
          src="https://www.sreenidhi.edu.in/assets/images/sreenidhi-logo.png"
          alt=""
          className="logo"
        />
        <br />
        <div className="content">
          <div className="rdBtn">
            <div className="container-login100-form-btn m-t-17">
              <nav>
                <label for="touch1">
                  <span className="login100-form-btn">{year}</span>
                </label>
                <input type="checkbox" id="touch1" />

                <ul class="slide">
                  <li
                    onClick={() => {
                      setYear("Year I");
                    }}
                  >
                    I
                  </li>
                  <li
                    onClick={() => {
                      setYear("Year II");
                    }}
                  >
                    II
                  </li>
                  <li
                    onClick={() => {
                      setYear("Year III");
                    }}
                  >
                    III
                  </li>
                  <li
                    onClick={() => {
                      setYear("Year IV");
                    }}
                  >
                    IV
                  </li>
                </ul>
              </nav>
            </div>
            <div className="container-login100-form-btn m-t-17">
              <nav>
                <label for="touch2">
                  <span2 className="login100-form-btn">{sem}</span2>
                </label>
                <input type="checkbox" id="touch2" />

                <ul class="slide">
                  <li
                    onClick={() => {
                      setSem("Sem 1");
                    }}
                  >
                    Sem 1
                  </li>
                  <li
                    onClick={() => {
                      setSem("Sem 2");
                    }}
                  >
                    Sem 2
                  </li>
                </ul>
              </nav>
            </div>
            <div className="container-login100-form-btn m-t-17">
              <nav>
                <label for="touch3">
                  <span2 className="login100-form-btn">{exam}</span2>
                </label>
                <input type="checkbox" id="touch3" />

                <ul className="slide">
                  <li
                    onClick={() => {
                      setExam("Mid");
                    }}
                  >
                    Mid
                  </li>
                  <li
                    onClick={() => {
                      setExam("Sem");
                    }}
                  >
                    Sem
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="wrap-input100 ">
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Enter id"
              value={tempId}
              onChange={(e) => setTempId(e.target.value)}
              onKeyPress={() => {
                setId1(tempId);
              }}
            />
            <div className="container-login100-form-btn-top">
              <button
                className="login100-form-btn"
                onClick={() => {
                  setId1(tempId);
                }}
              >
                Get
              </button>
            </div>
          </div>
          <Name />
        </div>

        <div className="table-responsive">
          <TableData />
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<Output />, document.getElementById("container"));
