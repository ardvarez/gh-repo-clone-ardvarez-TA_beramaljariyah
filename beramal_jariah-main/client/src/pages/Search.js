import { useContext } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router";

import { SearchContext } from "../contexts/searchContext";

import Program from "../components/cards/Program";
import Footer from "../components/cards/Footer";
import NotFound from "../components/cards/NotFound";

function Search() {
  const navigation = useHistory();
  const [search] = useContext(SearchContext);

  const keyword = search.keyword;
  const searchedPrograms = search.search;

  const navigateTo = (program, idProgram) => {
    return navigation.push(`/${program}/${idProgram}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: 70 }}
      className="d-flex flex-column align-items-center"
    >
      <div className="w-80 transaction-wrapper d-flex flex-column align-items-center p-4">
        <span>{`Mendapatkan ${searchedPrograms.length} hasil pencarian dari "${keyword}"`}</span>
      </div>
      {searchedPrograms.length === 0 ? (
        <NotFound title="Program tidak tersedia" style={{ marginTop: 30 }} />
      ) : (
        <div className="w-80 d-flex flex-wrap justify-content-around mt-4 p-4 align-items-center">
          {searchedPrograms.map((program) => {
            return (
              <Program
                withPengelola={true}
                pengelola={program.pengelola.name}
                title={program.title}
                target={program.target}
                image={program.image}
                danaTerkumpul={program.totalTransactions}
                donatur={program.totalDonatur}
                style={{ marginBottom: 15, width: "21rem" }}
                action={() => navigateTo(program.type, program.id)}
              />
            );
          })}
        </div>
      )}
      <Footer />
    </motion.div>
  );
}

export default Search;
