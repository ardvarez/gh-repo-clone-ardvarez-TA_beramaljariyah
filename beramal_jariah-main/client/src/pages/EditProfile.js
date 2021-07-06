import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import EditCard from "../components/cards/EditCard";
import Footer from "../components/cards/Footer";
import Loading from "../components/cards/Loading";

function EditProfile() {
  const userId = localStorage.token;
  const [user, setUser] = useState({
    data: {},
    load: true,
  });

  const getData = async () => {
    try {
      await axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((result) => {
          setUser({
            data: result.data,
            load: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 90 }}
      className="d-flex flex-column align-items-center"
    >
      {user.load ? <Loading /> : <EditCard user={user.data} />}
      <Footer />
    </motion.div>
  );
}

export default EditProfile;
