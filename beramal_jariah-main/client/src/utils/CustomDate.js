function CustomDate(date) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (date == "") {
    const currentDate = new Date();
    const today = currentDate.toLocaleDateString();
    const modifiedDate = today.split("/");

    const selectedMonth = months.find(
      (month, index) => index + 1 == modifiedDate[0]
    );

    const customDate =
      modifiedDate[1] + " " + selectedMonth + " " + modifiedDate[2];

    return customDate;
  } else {
    const modifiedDate = date.split("/");

    const selectedMonth = months.find(
      (month, index) => index + 1 == modifiedDate[0]
    );

    const customDate =
      modifiedDate[1] + " " + selectedMonth + " " + modifiedDate[2];

    return customDate;
  }
}

export default CustomDate;
