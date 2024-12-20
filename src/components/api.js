import { config } from "../scripts/api-config";

function getResponseData(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser() {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers
  }).then(getResponseData)
}

export function getCards(){
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(getResponseData)
}

export function updateUser(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({name, about})
  }).then(getResponseData)
}

export function createCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({name, link})
  }).then(getResponseData)
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

export function setLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData)
}

export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData)
}

export function updateAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar/`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({avatar: url})
  }).then(getResponseData)
}
