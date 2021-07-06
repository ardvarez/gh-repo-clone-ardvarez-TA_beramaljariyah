import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Loading from "./Loading";

function TentangContent() {
  const [data, setData] = useState({
    content: {},
    load: true,
  });

  const getTentangContent = async () => {
    await axios.get("http://localhost:5000/about/1").then((result) => {
      setData({
        content: result.data,
        load: false,
      });
    });
  };

  useEffect(() => {
    getTentangContent();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-80 d-flex align-items-center flex-column"
    >
      {data.load ? (
        <Loading />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data.content.content }}></div>
      )}
    </motion.div>
  );
}

export default TentangContent;
