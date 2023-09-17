import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { MainWrapper } from "./components/MainWrapper";

export function App() {
  return (
      <MainWrapper>
        <Header />
        <Main />
      </MainWrapper>
  )
}
