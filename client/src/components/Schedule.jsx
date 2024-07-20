import { useState } from "react";
import styles from "./Schedule.module.css";
import { Button, DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Schedule() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.schedule}>
      <h1>3 Step: Plan Your Schedule </h1>
      <Space direction="vertical" size={12}>
        <RangePicker
          className={styles.datePicker}
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={(newDate) => {
            console.log(newDate);
            setDate(newDate);
          }}
        />
      </Space>
      <Button type="primary">Choose Date</Button>
    </div>
  );
}

export default Schedule;
