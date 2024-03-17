export const saveUser = (user: Object) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const saveDraft = (draft: Object) => {
  const drafts = localStorage.getItem("drafts")
    ? (JSON.parse(localStorage.getItem("drafts") as string) as Object[])
    : [];
  let count = 0;

  if (drafts) {
    count += drafts.length + 1;
    drafts.push({ id: count, ...draft });
  }
  localStorage.setItem("drafts", JSON.stringify(drafts));
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("tutorial");
  localStorage.removeItem("drafts");
};
