import styled from 'styled-components';

const AppContainer = styled.div`
  height: 100%;
`;
const Loading = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  color: #172660;
`;

const Error = styled(Loading)`
  margin-bottom: 20px;
  color: #981515;
`;

export { AppContainer, Loading, Error };
