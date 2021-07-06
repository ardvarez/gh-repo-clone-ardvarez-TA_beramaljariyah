import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Loading from "./Loading";

function SyaratKetentuan() {
  const [data, setData] = useState({
    content: {},
    load: true,
  });

  const getSyaratContent = async () => {
    await axios
      .get("http://localhost:5000/about?_start=1&_end=6")
      .then((result) => {
        setData({
          content: result.data,
          load: false,
        });
      });
  };

  useEffect(() => {
    getSyaratContent();
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
        data.content.map((item) => {
          return <div dangerouslySetInnerHTML={{ __html: item.content }}></div>;
        })
      )}
    </motion.div>
  );
}

export default SyaratKetentuan;
