export const token = "4f7c2bf6-ee8f-47df-b8ab-dfa6cf75782d"
export const groupId = "cohort-mag-4"

export const config = {
  baseUrl: `https://nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': "application/json"
  }
}
