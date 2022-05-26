import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './App.css';

const optionApex = {
  chart: {
    id: ''
  },
  xaxis: {
    categories: []
  }
}

function App() {
  const [options, setOptions] = useState<any>({ optionApex });
  const [series, setSeries] = useState<Array<any>>([]);
  const age: any[] = [];
  const salary: any[] = [];

  useEffect(() => {
    axios
      .get('https://dummy.restapiexample.com/api/v1/employees')
      .then((res) => {
        res.data.data.map((items: any) => {
          age.push(items.employee_age)
          salary.push(items.employee_salary)
        })
        setOptions({
          chart: {
            id: ''
          },
          xaxis: {
            categories: salary
          }
        })
        setSeries([
          {
            name: 'idade',
            data: age
          }
        ])
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res.data);
          console.log(error.res.status);
          console.log(error.res.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={600}
        height={300}
      />
    </div>
  );
}

export default App;
