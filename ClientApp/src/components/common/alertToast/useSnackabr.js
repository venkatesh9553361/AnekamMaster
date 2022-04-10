import { useState, useEffect, useCallback } from "react";

function useSnackabr() {
  const [list, setList] = useState([]);
  let toastProperties = null;
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = list.filter((e) => e.id !== id);
      setList(toastListItem);
    },
    [list, setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) {
        deleteToast(list[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [list, deleteToast]);

  const createToast = (type,title,description) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: title,
          description: description,
          backgroundColor: "#5cb85c",
        };
        break;
      case "danger":
        toastProperties = {
          id: list.length + 1,
          title: title,
          description: description,
          backgroundColor: "#d9534f",
        };
        break;
      case "info":
        toastProperties = {
          id: list.length + 1,
          title: title,
          description: description,
          backgroundColor: "#5bc0de",
        };
        break;
      case "warning":
        toastProperties = {
          id: list.length + 1,
          title: title,
          description: description,
          backgroundColor: "#f0ad4e",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };
  return { createToast, list };
}

export default useSnackabr;
