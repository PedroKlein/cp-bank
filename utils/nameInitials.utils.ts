export default function getNameInitials(name?: string) {
  if (!name) return "??";

  const names = name.toUpperCase().split(" ");

  return `${names[0][0]}${names[names.length - 1][0]}`;
}
