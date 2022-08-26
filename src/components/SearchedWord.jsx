import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, ListGroup, ListGroupItem } from "reactstrap";

export default function SearchedWord() {
  const [searchedWord, setWord] = useState();

  const params = useParams();
  const word = params.word;

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://dummyjson.com/posts/search?q=${word}`;
      const response = await fetch(url);
      const data = await response.json();
      setWord(data);
    };
    fetchData();
  }, [word]);
  return (
    <div>
      {searchedWord?.posts?.map((item) => {
        const boldWord = item.body.split(" ");

        var rt = boldWord.map((i, index) => (
          <span>
            {i.toLowerCase().includes(word.toLowerCase()) ? (
              <b>{i} </b>
            ) : (
              <span>{i} </span>
            )}
          </span>
        ));
        return (
          <List key={item.id}>
            <ListGroup>
              <ListGroupItem>{rt}</ListGroupItem>
            </ListGroup>
          </List>
        );
      })}
    </div>
  );
}
