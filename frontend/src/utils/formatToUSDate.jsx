export function formatToUSDate(dateString) {
  // Create a Date object from the ISO 8601 formatted string
  const date = new Date(dateString);

  // Format the date using toLocaleDateString with 'en-US' locale
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // new Date(book.createdAt).toLocaleDateString();
  
  return formattedDate;
}

