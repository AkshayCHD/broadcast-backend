const RtcTokenBuilder = require('./RtcTokenBuilder').RtcTokenBuilder;
const RtcRole = require('./RtcTokenBuilder').Role;
const appID = "ec567d18c6454a7eabb9de9dfda67bb2";

const appCertificate = "a80871da675f4df4aa6ea5541e2badd3";
const channelName = '7d72365eb983485397e3e3f9d460bdda';
// const uid = 2882341273;
// const account = "2882341273";
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 360000

const currentTimestamp = Math.floor(Date.now() / 1000)

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

// Build token with uid
console.log(RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, 123, role, privilegeExpiredTs))
// console.log(RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, null, role, privilegeExpiredTs))
interface IProps {
	channel: string
}
export default ({ channel } : IProps) => {
    const token = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channel, channel, role, privilegeExpiredTs);
    return { token, channel, uid: channel, appId: appID }
}
// console.log("Token With Integer Number Uid: " + tokenA);

// // Build token with user account
// const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
// console.log("Token With UserAccount: " + tokenB);
