import React, {useState} from 'react'
import axios from 'axios'
import HistoryLoading from "./history_loading";

export default () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChangeFrom = e => {
    setFrom(e.target.value)
  }

  const handleChangeTo = e => {
    setTo(e.target.value)
  }

  const handleChangeAmount = e => {
    setAmount(e.target.value)
  }

  const handleBlur = e => {
    if (!e.target.value) {
      setError('Insert a currency.')
    }
    setSubmitting(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!from || !to || !amount) {
        setError('All fields are required')
        setSubmitting(false)
      } else {
        const params = {
          from: from,
          to: to,
          amount: amount
        };

        await axios.get(`http://localhost:3000/convert`, { params })

        window.location.reload(false);
        setSubmitting(false)
      }
    } catch (err) {
      setError(err.response.message)
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="smart-green">
        <h1>Convert:</h1>
        {isSubmitting ? (
            <HistoryLoading />
        ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-field black-input">
            <input
              onChange={handleChangeFrom}
              onBlur={handleBlur}
              type="text"
              placeholder="BRL"
              name="from"
            />
            <input
                onChange={handleChangeTo}
                onBlur={handleBlur}
                type="text"
                placeholder="USD"
                name="to"
            />
            <input
                onChange={handleChangeAmount}
                onBlur={handleBlur}
                type="text"
                placeholder="2.50"
                name="amount"
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </div>
          <button
            type="submit"
            className="btn btn-rounded gradient-green"
            disabled={isSubmitting}>
            Submit
          </button>
        </form>
        )}
      </div>
    </>
  )
}
