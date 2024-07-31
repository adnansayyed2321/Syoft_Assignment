import Cookies from 'js-cookie'

const Dashboard = () => {
  const userDetails = Cookies.get('userDetails')
  const userDetailsObject = JSON.parse(userDetails)

  return (
    <div>
      <h1>Hi {userDetailsObject.fullName}</h1>
      <p>You are on right placce</p>
    </div>
  )
}

export default Dashboard
