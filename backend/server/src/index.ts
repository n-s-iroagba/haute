import express, { Response } from 'express';
import sequelize from './orm_setup';
import cron from 'node-cron';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './router';
import { updateInvestmentEarningsAndNotifiy, sendInvestmentReminderEmails } from './service/mailService';
import { Admin } from './types/adminTypes';
import { Investment } from './types/investorTypes';


export const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

cron.schedule('0 0 * 17 * *',async()=> await updateInvestmentEarningsAndNotifiy());
cron.schedule('0 8 * * *', async()=>await sendInvestmentReminderEmails());


app.use('/', routes);

app.use('/login', routes);
app.use('/verify-email/:token', routes);
app.use("/resend-verification-token/:email", routes);
app.use("/request-passswordChange", routes);
app.use('/new-password/:id', routes);
app.use("/verify-password-token/:token", routes);

app.use('/create-admin', routes);

app.use('/create-investor', routes);
app.use('/investor/:id', routes);
app.use ('/update-verification/:id', routes)
app.use ('/add-earnings/:id', routes)
app.use('/get-investors', routes);
app.use('/pay-referral/:id', routes);
app.use('/pay-bonus/:id', routes);
app.use('/pay', routes);
app.use('/email/:id', routes)
app.use('/pay-with-id/:id', routes);
app.use('/delete-investor/:id', routes);

app.use('/create-manager', routes);
app.use('/patch-manager/:id', routes);
app.use('/get-managers', routes);
app.use('/manager/:id', routes);
app.use('/delete-manager/:id', routes);

app.use('/create-promo', routes);
app.use('/patch-promo', routes);
app.use('/get-promo', routes);
app.use('/get-adpromo', routes);
app.use('/delete-promo/:id',routes)
app.use('/delete-manager', routes);


app.use('/create-investment/:id', routes);
app.use('/patch-investment', routes);
app.use('/get-investment/:id', routes);
app.use('/get-investment-status/:id', routes);
app.use('/get-pending-bonus', routes);

app.use('/create-wallet', routes);
app.use('/get-wallets', routes);
app.use('/patch-wallet', routes);
app.use('/delete-wallet/:id', routes);

app.use('/create-wallet', routes);
app.use('/get-wallets', routes);
app.use('/patch-wallet', routes);
app.use('/delete-wallet/:id', routes);

app.use('/get-notifications/:id', routes);
app.use('/get-transactions/:id', routes);
app.use('/get-newbies', routes); 
app.use('/get-pending-referral', routes)
app.use('/get-available-currencies',routes)

app.use ('/get-referral-details/:id',routes)
app.use ('/notifications/mark-all-as-read/:id',routes)


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'POST, GET,DELETE,PATCH')
  next()
})

sequelize
  .sync({

 
  })
  .then(() => console.log('models formed'))
  .catch((err:any) => console.log(err));
app.listen(PORT, () => {
  console.log(`takum listening on port ${PORT}`);
});


