FROM node:14 as build-stage
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . . 

ENV NODE_ENV=__NODE_ENV__
ENV VUE_APP_AUTH0_CLIENT_ID=__VUE_APP_AUTH0_CLIENT_ID__
ENV VUE_APP_AUTH0_DOMAIN=__VUE_APP_AUTH0_DOMAIN__
ENV VUE_APP_MOBILEWALLET_URL=__VUE_APP_MOBILEWALLET_URL__
ENV VUE_APP_RECAPTCHA_SITE_KEY=__VUE_APP_RECAPTCHA_SITE_KEY__
ENV VUE_APP_SERVER_WEBSOCKET_URL=__VUE_APP_SERVER_WEBSOCKET_URL__
ENV VUE_APP_STUDIO_SERVER_BASE_URL=__VUE_APP_STUDIO_SERVER_BASE_URL__
ENV VUE_APP_TELEGRAM_BOT_ID=__VUE_APP_TELEGRAM_BOT_ID__
ENV VUE_APP_TELEGRAM_VERIFIER_BOT=__VUE_APP_TELEGRAM_VERIFIER_BOT__
ENV VUE_APP_TITLE=__VUE_APP_TITLE__
ENV VUE_APP_VERSION=__VUE_APP_VERSION__
ENV VUE_APP_WEBWALLET_URL=__VUE_APP_WEBWALLET_URL__
ENV VUE_APP_GA_CODE=__VUE_APP_GA_CODE__

ENV VUE_APP_KOMMINICATE_APP_ID=__VUE_APP_KOMMINICATE_APP_ID__
ENV VUE_APP_WEBPUSH_VAPID_PUBLIC_KEY=__VUE_APP_WEBPUSH_VAPID_PUBLIC_KEY__
ENV VUE_APP_INVESTOR_API_SECRET_KEY=__VUE_APP_INVESTOR_API_SECRET_KEY__
ENV VUE_APP_BTN_BACKGROUND=__VUE_APP_BTN_BACKGROUND__
ENV VUE_APP_BTN_TXT_COLOR=__VUE_APP_BTN_TXT_COLOR__
ENV VUE_APP_HEADER_BACKGROUND=__VUE_APP_HEADER_BACKGROUND__
ENV VUE_APP_HEADER_TEXT_COLOR=__VUE_APP_HEADER_TEXT_COLOR__
ENV VUE_APP_THEME_BACKGROUND=__VUE_APP_THEME_BACKGROUND__
ENV VUE_APP_MOOPAY_PAYMENT_URL=__VUE_APP_MOOPAY_PAYMENT_URL__
ENV VUE_APP_FYRE_WALLET_ADDRESS=__VUE_APP_FYRE_WALLET_ADDRESS__
ENV VUE_APP_AUTH0_LOGIN_CLIENT_ID=__VUE_APP_AUTH0_LOGIN_CLIENT_ID__


RUN npm run build

FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]