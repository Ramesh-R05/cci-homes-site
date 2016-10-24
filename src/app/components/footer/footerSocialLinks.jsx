import React, {Component} from 'react';
import FooterSocialIcon from './footerSocialIcon';

export default class FooterSocialLinks extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <section className="get-social">
                <p>
                    Get
                    <b>Social</b>
                </p>
                <div className="get-social__links">
                    <FooterSocialIcon name="facebook"
                                      url="http://www.facebook.com/homestoloveau"
                                      svg='<svg version="1.1" id="Layer_1" x="0px" y="0px"  width="65.098px" height="64.564px" viewBox="0 0 65.098 64.564" enable-background="new 0 0 65.098 64.564"> <path fill-rule="evenodd" clip-rule="evenodd" class="facebook" d="M32.549,0c17.976,0,32.549,14.452,32.549,32.282 c0,17.829-14.573,32.282-32.549,32.282C14.573,64.564,0,50.111,0,32.282C0,14.452,14.573,0,32.549,0z"/> <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M34.57,45.058h-4.927V31.744h-3.286v-3.328h3.286l-0.004-3.337 c0-3.571,1.236-5.808,5.46-5.808l3.579-0.007v4.161l-2.227,0c-1.637,0-1.86,0.137-1.881,0.832c-0.047,1.404,0,4.161,0,4.161h4.107 l-0.821,3.328H34.57V45.058z"/> </svg>'
                                      label="homestoloveau" />
                    <FooterSocialIcon name="twitter"
                                      url="http://twitter.com/homestoloveau"
                                      svg='<svg version="1.1" id="Layer_2" x="0px" y="0px" width="65.098px" height="64.564px" viewBox="0 0 65.098 64.564" enable-background="new 0 0 65.098 64.564"> <path fill-rule="evenodd" clip-rule="evenodd" class="twitter" d="M32.548,0c17.977,0,32.55,14.452,32.55,32.282 c0,17.829-14.573,32.282-32.55,32.282C14.573,64.564,0,50.111,0,32.282C0,14.452,14.573,0,32.548,0z"/> <path fill="#FFFFFF" d="M45.849,24.411c-0.974,0.416-2.021,0.698-3.119,0.826c1.121-0.649,1.982-1.676,2.388-2.9 c-1.05,0.601-2.211,1.037-3.448,1.271c-0.991-1.019-2.402-1.655-3.965-1.655c-3,0-5.432,2.347-5.432,5.242 c0,0.411,0.049,0.81,0.142,1.194c-4.514-0.218-8.515-2.305-11.193-5.477c-0.468,0.773-0.735,1.675-0.735,2.635 c0,1.819,0.959,3.424,2.416,4.362c-0.891-0.027-1.728-0.263-2.459-0.655c0,0.022,0,0.044,0,0.066c0,2.54,1.872,4.657,4.356,5.141 c-0.456,0.118-0.935,0.184-1.431,0.184c-0.35,0-0.69-0.033-1.022-0.095c0.691,2.082,2.697,3.598,5.073,3.64 c-1.859,1.406-4.201,2.244-6.746,2.244c-0.438,0-0.871-0.024-1.296-0.073c2.403,1.486,5.258,2.354,8.326,2.354 c9.989,0,15.452-7.986,15.452-14.914c0-0.227-0.006-0.452-0.017-0.677c1.063-0.739,1.983-1.663,2.71-2.712V24.411z"/></svg>'
                                      label="@homestoloveau" />
                    <FooterSocialIcon name="instagram"
                                      url="http://instagram.com/homestoloveau/"
                                      svg='<svg version="1.1" id="Layer_3" x="0px" y="0px" width="64.879px" height="64.673px" viewBox="0 0 64.879 64.673" enable-background="new 0 0 64.879 64.673"><path fill-rule="evenodd" class="instagram" clip-rule="evenodd"  d="M32.439,0c17.916,0,32.439,14.478,32.439,32.336 c0,17.86-14.523,32.337-32.439,32.337S0,50.197,0,32.336C0,14.478,14.523,0,32.439,0z"/><path fill="#FFFFFF" d="M40.963,21.503h-16.49c-1.518,0-2.749,1.234-2.749,2.753v16.517c0,1.521,1.231,2.754,2.749,2.754h16.49 c1.518,0,2.748-1.233,2.748-2.754V24.256C43.711,22.737,42.48,21.503,40.963,21.503 M32.718,29.762c2.531,0,2.748,2.752,2.748,2.752 s0.081,2.753-2.748,2.753c-2.828,0-2.749-2.753-2.749-2.753S30.187,29.762,32.718,29.762 M41.179,39.376 c0,0.762-0.869,1.613-1.629,1.613H25.808c-0.761,0-1.591-0.833-1.591-1.594v-6.882c0-0.759,0.869-1.573,1.63-1.573h1.569 c-0.115,0.443-0.195,1.096-0.195,1.573c0,3.041,2.461,5.507,5.497,5.507c3.035,0,5.497-2.466,5.497-5.507 c0-0.477-0.082-1.109-0.195-1.554h1.569c0.76,0,1.59,0.775,1.59,1.534V39.376z M40.963,27.009c0,0.761-0.614,1.376-1.374,1.376 h-1.374c-0.759,0-1.375-0.616-1.375-1.376v-1.375c0-0.76,0.616-1.377,1.375-1.377h1.374c0.76,0,1.374,0.617,1.374,1.377V27.009z"/> </svg>'
                                      label="homestoloveau" />
                </div>
            </section>
        );
    }
}