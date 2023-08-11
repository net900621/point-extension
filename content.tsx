import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

function getPathTo(element) {
  if (element.id !== "") return `#${element.id}`
  if (element === document.body) return element.tagName
  var ix = 0
  var siblings = element.parentNode.childNodes
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i]
    if (sibling === element)
      return (
        getPathTo(element.parentNode) +
        ">" +
        element.tagName.toLowerCase() +
        ":nth-of-type(" +
        (ix + 1) +
        ")"
      )
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
  }
}

const hoverEvent = (e) => {
  e.target.style.backgroundColor = "red"
}

const outEvent = (e) => {
  e.target.style.backgroundColor = ""
}

const clickEvent = (e) => {
  const event = prompt(),
    key = getPathTo(e.target),
    eventObj = JSON.parse(localStorage.getItem("event-point") || "[]")
  eventObj.push({
    event,
    key
  })
  localStorage.setItem("event-point", JSON.stringify(eventObj))
  //   console.log(document.querySelector(getPathTo(e.target)))
}

const SendDom = () => {
  const [hailingFrequency] = useStorage("hailing")
  useEffect(() => {
    window.removeEventListener("mouseover", hoverEvent)
    window.removeEventListener("mouseout", outEvent)
    window.removeEventListener("click", clickEvent)
    if (hailingFrequency === "true") {
      const eventList = JSON.parse(localStorage.getItem("event-point") || "[]")
      console.log(eventList, 33333)
      eventList.length &&
        eventList.forEach((v) => {
          document.querySelector(v.key).onclick = () => {
            console.log(v.event)
          }
        })
    } else {
      window.addEventListener("mouseover", hoverEvent)
      window.addEventListener("mouseout", outEvent)
      window.addEventListener("click", clickEvent)
    }
  }, [hailingFrequency])
  return (
    <>
      <p
        onClick={() => {
          localStorage.setItem("event-point", "")
        }}>
        点击清空埋点
      </p>
    </>
  )
}

export default SendDom
