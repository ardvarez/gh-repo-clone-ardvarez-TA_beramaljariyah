import { motion } from "framer-motion";

function TentangProgram(props) {
  const { tentangProgram } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: "80%", margin: "30px 0" }}
    >
      <div
        className="w-100 d-flex flex-column"
        dangerouslySetInnerHTML={{ __html: tentangProgram.description }}
        style={{ textAlign: "justify" }}
      ></div>
    </motion.div>
  );
}

export default TentangProgram;
