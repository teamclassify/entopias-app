import moment from "moment/moment";

export default function formatDate(timestamp) {
  return moment(timestamp * 1000).format("DD/MM/YYYY HH:mm:ss");
}
