import { useEffect } from "react";

function TitleUpdater({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; 
}

export default TitleUpdater;
