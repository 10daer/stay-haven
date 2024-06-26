import styled from "styled-components";
import GlobalTypes from "../utils/GlobalType";

const StyledParag = styled.p`
  font-size: 2rem;
  margin: 28vh auto;
`;

Empty.propTypes = GlobalTypes;

function Empty({ resource }) {
  return <StyledParag>No {resource} could be found.</StyledParag>;
}

export default Empty;
