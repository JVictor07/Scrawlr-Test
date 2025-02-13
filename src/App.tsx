import { FC } from "react";
import { UpvoteList } from "./components/UpvoteList";

const App: FC = () => (
  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <UpvoteList />
  </div>
);

export default App;
