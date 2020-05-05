import API from '../api';
import logger from '../../../../logger';

export default async function siteAlert(req, res, next) {
    try {
        const homepageDataResp = await API.getEntity('homepage', { throwOnFailedRequest: false });

        const homepageData = homepageDataResp || {};

        const {
            siteAlertTextColour,
            siteAlertBackgroundColour,
            siteAlertBackgroundImage,
            siteAlertButtonColour,
            siteAlertPrimaryText,
            siteAlertSecondaryText,
            siteAlertButtonLink,
            enableSiteAlert
        } = homepageData;

        const siteAlertData = {
            styles: {
                textColor: siteAlertTextColour,
                backgroundColor: siteAlertBackgroundColour,
                backgroundImage: siteAlertBackgroundImage && siteAlertBackgroundImage.url ? siteAlertBackgroundImage.url : '',
                buttonColor: siteAlertButtonColour
            },
            primaryText: siteAlertPrimaryText,
            secondaryText: siteAlertSecondaryText,
            link: siteAlertButtonLink,
            isEnabled: enableSiteAlert
        };

        res.body = {
            ...res.body,
            siteAlertData
        };
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}
