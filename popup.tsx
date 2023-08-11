import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const [data, setData] = useState<boolean>(false)
  const storage = new Storage()
  useEffect(() => {
    storage.set("hailing", "true")
  }, [])
  const onChangeValue = async (e) => {
    setData((e) => !e)
    await storage.set("hailing", data ? "true" : "false")
  }
  return (
    <div
      style={{
        width: 200
      }}>
      <h2>请选择模式</h2>
      <div onChange={onChangeValue}>
        <input type="radio" value="0" name="point" checked={!data} /> 埋点
        <input type="radio" value="1" name="point" checked={data} /> 配置
      </div>
    </div>
  )
}

export default IndexPopup
