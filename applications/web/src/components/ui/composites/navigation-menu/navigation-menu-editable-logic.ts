/** An edit is dropped when nothing changed, or when it was cleared and the field cannot be empty. */
export const shouldSkipEditableCommit = (
  next: string,
  current: string,
  allowEmpty: boolean,
): boolean => (!next && !allowEmpty) || next === current;
