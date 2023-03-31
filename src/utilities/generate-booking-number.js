export function generateBookingNumber() {
  let no = '';
  while (no.length < 3) {
    no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
  }
  while (no.length < 6) {
    no += Math.floor(Math.random() * 10);
  }
  return no;
}