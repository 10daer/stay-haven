import styled from "styled-components";

const StyledParag = styled.p`
  font-size: 2rem;
  margin: 28vh auto;
`;

function Empty({ resource }) {
  return <StyledParag>No {resource} could be found.</StyledParag>;
}

export default Empty;
