const router = require('express').Router();

router.get('/usergettest', (req, res) => {
  res.send('User get test is successful');
});

router.post('/userposttest', (req, res) => {
  const userName = req.body.userName;
  console.log(userName);
  res.send(`User post test is successful: ${userName}`);
});

module.exports = router;
