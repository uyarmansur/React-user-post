import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Pagination } from "reactstrap";

export default function Posts() {
  const [paginatedPosts, setPaginated] = useState([]);
  const [pageCount, setCount] = useState(0);
  const [page,setPage]=useState(0)
  const limit = 10;

  useEffect(() => {
    const fetchFirstData = () => {
      fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=${pageCount}&select=title,reactions,userId`
      )
        .then((res) => res.json())
        .then((data) => {
          setPaginated(data);
          const page = data.total / limit;
          setPage(page)
        });
    };
    fetchFirstData();
  }, [pageCount]);

  return (
    <div>
      <Pagination count={page} page={paginatedPosts}>
        {paginatedPosts?.posts?.map((item) => (
          <span key={item.id}>{item.title}</span>
        ))}
      </Pagination>
      {[...Array(page).keys()].map((k) => (
        <Button onClick={() => setCount(k)}> {k + 1} </Button>
      ))}
    </div>
  );
}
