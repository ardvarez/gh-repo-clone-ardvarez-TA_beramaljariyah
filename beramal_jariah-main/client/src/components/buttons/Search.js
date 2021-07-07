import { useState, useContext, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";

import { SearchContext } from "../../contexts/searchContext";

import Loupe from "../../assets/loupe.png";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({
    data: [],
  });
  const navigate = useHistory();

  const [search, setSearch] = useContext(SearchContext);

  const getData = async () => {
    const programs = await axios
      .get("http://localhost:5000/programs")
      .then((result) => result.data);

    let modifiedPrograms = [];
    for (let i = 0; i < programs.length; i++) {
      let newData = {};

      const pengelola = await axios
        .get(`http://localhost:5000/users/${programs[i].userId}`)
        .then((result) => result.data);

      const allTransactions = await axios
        .get(
          `http://localhost:5000/transactionsUser?programId=${programs[i].id}`
        )
        .then((result) => result.data);

      let totalProgramCost = 0;

      for (let x = 0; x < allTransactions.length; x++) {
        totalProgramCost += allTransactions[x].total;
      }

      newData = {
        ...programs[i],
        pengelola,
        totalTransactions: totalProgramCost,
        totalDonatur: allTransactions.length,
      };

      modifiedPrograms.push(newData);
    }

    setData({
      data: modifiedPrograms,
    });
  };

  const searchProgram = () => {
    const lowerCaseInput = searchInput.toLowerCase();

    const filterPrograms = data.data.filter((item) => {
      return item.title.toLowerCase().includes(lowerCaseInput);
    });

    setSearch({
      type: "SEARCH",
      payload: {
        keyword: searchInput,
        search: filterPrograms,
      },
    });
    navigate.push("/search");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form inline style={{ marginRight: 50 }}>
      <InputGroup
        className="d-flex align-items-center"
        style={{ backgroundColor: "#fff", borderRadius: 20 }}
      >
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ border: "none", height: 38, borderRadius: 20 }}
        />
        <InputGroup.Prepend>
          <InputGroup.Text
            id="search-btn-icon"
            style={{
              backgroundColor: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: 20,
            }}
            onClick={() => searchProgram()}
          >
            <img src={Loupe} alt="search icon" />
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
}

export default Search;
