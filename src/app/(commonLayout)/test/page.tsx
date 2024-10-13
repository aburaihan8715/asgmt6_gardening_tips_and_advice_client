'use client';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

const Test = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    // Simulating an API call with a timeout
    setTimeout(() => {
      setItems((prevItems) =>
        prevItems.concat(Array.from({ length: 20 })),
      );
    }, 1500);
  };

  return (
    <div className="mt-[80px]">
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <div id="scrollableDiv" className="h-[70vh] overflow-auto">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {items.map((_, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Test;
