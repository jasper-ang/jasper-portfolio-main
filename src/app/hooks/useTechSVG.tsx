/**
 * Custom hook `useTechSVG` to store SVG data of different tech stack icons.
 *
 * The function of this hook is as follows:
 * - To be imported into a tech stack component for styling.
 */

import React from 'react';
import type { SVGProps } from 'react';

export interface TechItem {
  name: string;
  icon: React.ReactNode; // This covers SVG icons or any React elements
}

// interface IconProps extends React.SVGProps<SVGSVGElement> {
//   // You can add custom props here if needed
// }

const TypeScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} fill="none" {...props}>
    <path
      fill="#3178C6"
      d="M32.3 0H5.7A5.7 5.7 0 0 0 0 5.7v26.6A5.7 5.7 0 0 0 5.7 38h26.6a5.7 5.7 0 0 0 5.7-5.7V5.7A5.7 5.7 0 0 0 32.3 0"
    />
    <path
      fill="#fff"
      d="M17.293 21.078h4.75v-3.043H8.758v3.043h4.75V34.66h3.785zm6.234 12.84c.601.312 1.336.542 2.153.698.816.155 1.707.23 2.597.23.891 0 1.707-.082 2.524-.253a6.4 6.4 0 0 0 2.078-.816c.601-.394 1.113-.89 1.41-1.559s.527-1.41.527-2.375c0-.675-.104-1.261-.304-1.781s-.49-.965-.89-1.336a5.9 5.9 0 0 0-1.337-1.039 17 17 0 0 0-1.781-.89c-.49-.201-.89-.394-1.336-.587-.386-.193-.72-.386-.965-.579a2.7 2.7 0 0 1-.63-.623 1.3 1.3 0 0 1-.223-.742q0-.38.2-.69c.134-.209.32-.38.557-.528q.356-.22.89-.341a5.2 5.2 0 0 1 1.188-.119c.312 0 .638.023.965.07q.514.07 1.039.215c.349.097.69.215 1.039.364.326.148.63.319.89.512v-3.488a9 9 0 0 0-1.855-.483 15 15 0 0 0-2.3-.156c-.892 0-1.708.097-2.524.282a5.9 5.9 0 0 0-2.079.891c-.6.4-1.038.89-1.41 1.559-.348.623-.52 1.336-.52 2.226 0 1.114.32 2.078.966 2.82.638.817 1.633 1.41 2.894 2.005.512.207.965.415 1.41.615q.669.3 1.114.624c.319.215.571.453.742.705.185.252.282.55.282.89q-.001.356-.17.669-.171.311-.528.534a3 3 0 0 1-.89.356 5.4 5.4 0 0 1-1.262.126 6.7 6.7 0 0 1-2.375-.423c-.816-.282-1.559-.705-2.086-1.146z"
    />
  </svg>
);

const ReactIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      fill="#53C1DE"
      d="M21.014 17.973c0-1.614-1.35-2.922-3.014-2.922s-3.014 1.308-3.014 2.922 1.35 2.922 3.014 2.922c1.665 0 3.014-1.308 3.014-2.922"
    />
    <path
      fill="#53C1DE"
      fillRule="evenodd"
      d="M27.788 12.548c.636-2.508 1.436-7.158-1.384-8.734-2.807-1.57-6.46 1.438-8.388 3.243-1.923-1.787-5.679-4.782-8.497-3.2-2.806 1.575-1.94 6.147-1.29 8.67-2.617.721-7.104 2.274-7.104 5.446 0 3.163 4.482 4.852 7.084 5.572-.653 2.537-1.475 7.045 1.335 8.616 2.828 1.581 6.572-1.342 8.518-3.167 1.941 1.816 5.56 4.758 8.367 3.183 2.816-1.581 2.083-6.169 1.432-8.707 2.522-.721 7.014-2.374 7.014-5.497 0-3.142-4.51-4.707-7.087-5.425m-.32 9.577a32 32 0 0 0-1.709-4.145 32 32 0 0 0 1.643-4.085c1.888.53 6.031 1.744 6.031 4.078 0 2.356-3.975 3.58-5.965 4.152m-1.762 8.842c-2.094 1.175-5.206-1.639-6.64-2.976a33 33 0 0 0 2.83-3.483c1.631-.14 3.172-.37 4.57-.683.458 1.795 1.344 5.96-.76 7.142m-15.442-.017c-2.095-1.171-1.137-5.194-.657-7.062 1.382.296 2.913.51 4.548.638a34 34 0 0 0 2.897 3.47c-1.217 1.142-4.683 4.13-6.788 2.954M2.567 17.973c0-2.365 4.118-3.57 6.05-4.099a33 33 0 0 0 1.644 4.133 33 33 0 0 0-1.665 4.191c-1.842-.51-6.03-1.859-6.03-4.225m7.675-12.907c2.103-1.18 5.367 1.695 6.763 2.99a34 34 0 0 0-2.875 3.449 36 36 0 0 0-4.503.678c-.524-2.035-1.487-5.937.615-7.117m12.685 7.958a33 33 0 0 1 3.077.522c-.29.904-.653 1.849-1.08 2.817a46 46 0 0 0-1.997-3.339m-4.91-3.97a30 30 0 0 1 1.985 2.325 44 44 0 0 0-3.989-.001 31 31 0 0 1 2.003-2.324m-6.928 7.308c-.42-.965-.78-1.914-1.073-2.831.963-.209 1.99-.38 3.06-.51a41 41 0 0 0-1.987 3.341m2.018 6.662a32 32 0 0 1-3.11-.485c.297-.933.664-1.903 1.093-2.889a41 41 0 0 0 2.017 3.374m4.949 3.966a32 32 0 0 1-2.03-2.356 49 49 0 0 0 4.011-.007 30 30 0 0 1-1.981 2.363m6.881-7.39c.452.997.832 1.961 1.134 2.878-.979.217-2.035.391-3.148.52a46 46 0 0 0 2.015-3.398m-3.846 3.568c-2.045.142-4.102.14-6.147.012a39 39 0 0 1-3.09-5.174 39 39 0 0 1 3.073-5.163c2.046-.15 4.105-.15 6.152 0a44 44 0 0 1 3.081 5.144 44 44 0 0 1-3.07 5.181m4.593-18.143c2.104 1.177 1.168 5.356.708 7.173-1.4-.313-2.92-.546-4.513-.691a33 33 0 0 0-2.853-3.453c1.415-1.322 4.574-4.194 6.658-3.03"
      clipRule="evenodd"
    />
  </svg>
);

const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M36 18c0-9.941-8.059-18-18-18S0 8.059 0 18s8.059 18 18 18 18-8.059 18-18"
      />
      <path
        fill="#000"
        d="M25.265 31.13c-.112.059-.102.078.004.023a.3.3 0 0 0 .09-.057c0-.02 0-.02-.094.034m.225-.122c-.054.044-.054.044.01.015.034-.02.064-.039.064-.044 0-.026-.015-.02-.074.029m.146-.088c-.053.044-.053.044.01.015a.2.2 0 0 0 .064-.045c0-.024-.015-.02-.074.03m.148-.088c-.053.045-.053.045.009.015.034-.02.063-.039.063-.045 0-.023-.015-.018-.072.03m.2-.132c-.102.069-.138.113-.044.064.063-.038.17-.123.15-.123-.04.015-.073.04-.107.06M17.018 3.01l-.453.039C12.3 3.435 8.312 5.73 5.783 9.265a14.84 14.84 0 0 0-2.647 6.553C3.015 16.642 3 16.886 3 18.005c0 1.117.015 1.357.136 2.182.817 5.636 4.825 10.366 10.259 12.12.978.311 2.003.527 3.17.66.453.048 2.416.048 2.87 0 2.017-.226 3.72-.724 5.406-1.583.259-.131.307-.166.273-.195a321 321 0 0 1-2.446-3.277l-2.397-3.237-3.003-4.448a388 388 0 0 0-3.027-4.448c-.01 0-.024 1.977-.03 4.389-.01 4.223-.01 4.395-.063 4.492a.54.54 0 0 1-.259.27c-.093.043-.176.053-.62.053h-.507l-.132-.083a.56.56 0 0 1-.195-.215l-.064-.132.005-5.879.01-5.879.093-.117a.7.7 0 0 1 .215-.176c.123-.059.171-.068.678-.068.596 0 .694.024.85.195a563 563 0 0 1 3.619 5.449c1.949 2.955 4.61 6.987 5.917 8.965l2.379 3.6.117-.079a15.3 15.3 0 0 0 3.08-2.704 14.94 14.94 0 0 0 3.531-7.666c.12-.825.136-1.07.136-2.187 0-1.119-.015-1.358-.136-2.183-.817-5.635-4.825-10.366-10.26-12.12a16 16 0 0 0-3.12-.653c-.283-.03-2.222-.064-2.466-.039zm6.138 9.073a.58.58 0 0 1 .297.34c.026.08.03 1.71.026 5.382l-.01 5.273-.928-1.425-.933-1.426v-3.828c0-2.482.01-3.873.024-3.942a.63.63 0 0 1 .293-.37c.117-.059.162-.064.626-.064.434 0 .508.005.605.06"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);

const TailwindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      fill="#44A8B3"
      d="M10.125 15.413q1.575-6.3 7.875-6.3c6.3 0 7.087 4.725 10.238 5.512q3.15.788 5.512-2.363-1.575 6.3-7.875 6.3c-6.3 0-7.087-4.725-10.237-5.512q-3.15-.788-5.513 2.362m-7.875 9.45q1.575-6.3 7.875-6.3c6.3 0 7.087 4.725 10.238 5.512q3.15.788 5.512-2.363-1.575 6.3-7.875 6.3c-6.3 0-7.087-4.724-10.237-5.512q-3.15-.788-5.513 2.363"
    />
  </svg>
);

const ExpressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M36 27.882a2.293 2.293 0 0 1-2.843-1.08l-5.174-7.157-.75-1-6.005 8.166a2.2 2.2 0 0 1-2.703 1.062l7.737-10.38-7.197-9.376a2.39 2.39 0 0 1 2.85.999l5.364 7.244 5.394-7.214a2.15 2.15 0 0 1 2.682-1.002l-2.793 3.706-3.783 4.925a1 1 0 0 0 0 1.49l7.206 9.619zM.003 17.364l.63-3.113C2.364 8.098 9.42 5.538 14.274 9.348c2.842 2.233 3.552 5.395 3.412 8.959H1.674c-.26 6.365 4.334 10.208 10.206 8.244a6.12 6.12 0 0 0 3.873-4.314c.31-.999.822-1.17 1.761-.882a8.13 8.13 0 0 1-3.883 5.936 9.41 9.41 0 0 1-10.96-1.4 9.86 9.86 0 0 1-2.46-5.787c0-.353-.12-.683-.2-.999Q0 18.234 0 17.366zm1.69-.429h14.481c-.09-4.614-3.001-7.887-6.884-7.917-4.323-.06-7.416 3.141-7.607 7.896z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);

const NodeJSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      fill="#539E43"
      d="M17.797 28.975a.7.7 0 0 1-.341-.089l-1.081-.642c-.163-.09-.081-.122-.033-.138.22-.073.26-.09.488-.22.024-.016.057-.008.081.009l.829.495c.033.017.073.017.098 0l3.242-1.877c.032-.016.049-.049.049-.09v-3.745c0-.041-.017-.074-.05-.09l-3.242-1.869c-.032-.016-.073-.016-.097 0l-3.242 1.87c-.033.015-.05.056-.05.088v3.747c0 .032.017.073.05.09l.885.511c.48.244.78-.04.78-.325v-3.697c0-.05.041-.098.098-.098h.414c.05 0 .098.04.098.098V26.7c0 .642-.35 1.016-.959 1.016-.187 0-.333 0-.748-.203l-.853-.488a.69.69 0 0 1-.341-.593v-3.746c0-.244.13-.472.341-.594l3.243-1.877a.73.73 0 0 1 .682 0l3.243 1.877c.21.122.34.35.34.594v3.746c0 .244-.13.471-.34.593l-3.243 1.877a.8.8 0 0 1-.341.073m1-2.576c-1.423 0-1.715-.65-1.715-1.202 0-.05.04-.098.097-.098h.423c.049 0 .09.033.09.081.064.431.251.642 1.113.642.682 0 .975-.154.975-.52 0-.211-.082-.365-1.146-.471-.886-.09-1.439-.284-1.439-.991 0-.659.553-1.049 1.48-1.049 1.04 0 1.552.358 1.617 1.138a.13.13 0 0 1-.025.073c-.016.016-.04.033-.065.033h-.422a.095.095 0 0 1-.09-.073c-.097-.447-.35-.594-1.016-.594-.747 0-.837.26-.837.455 0 .236.106.31 1.114.44 1 .13 1.47.316 1.47 1.015-.007.715-.593 1.121-1.625 1.121"
    />
    <path
      fill="#fff"
      d="M7.736 14.324a.41.41 0 0 0-.21-.358L4.08 11.983a.5.5 0 0 0-.187-.057H3.86a.4.4 0 0 0-.187.057L.228 13.966a.41.41 0 0 0-.212.357l.009 5.331c0 .073.04.147.105.18.065.04.146.04.203 0l2.048-1.171a.41.41 0 0 0 .211-.358v-2.494c0-.147.082-.285.212-.358l.87-.504a.4.4 0 0 1 .21-.057.35.35 0 0 1 .204.057l.87.504c.13.073.21.211.21.358v2.494c0 .147.082.285.212.358l2.048 1.17c.065.04.146.04.21 0a.2.2 0 0 0 .107-.179zm16.562-7.339a.22.22 0 0 0-.203 0 .21.21 0 0 0-.106.18v5.281a.16.16 0 0 1-.073.13.16.16 0 0 1-.146 0l-.861-.495a.42.42 0 0 0-.415 0l-3.446 1.99a.41.41 0 0 0-.21.358v3.974c0 .146.08.284.21.358l3.446 1.99a.42.42 0 0 0 .415 0l3.445-1.99a.41.41 0 0 0 .211-.358V8.497a.42.42 0 0 0-.21-.366zm-.317 10.11c0 .04-.016.073-.049.089l-1.178.683a.12.12 0 0 1-.106 0l-1.178-.683c-.032-.016-.049-.057-.049-.09V15.73c0-.04.017-.073.05-.089l1.177-.683a.12.12 0 0 1 .106 0l1.178.683c.033.016.05.057.05.09zm11.783-1.398a.4.4 0 0 0 .204-.358v-.967a.42.42 0 0 0-.204-.357l-3.42-1.983a.42.42 0 0 0-.415 0l-3.446 1.99a.41.41 0 0 0-.211.358v3.974c0 .146.081.285.211.358l3.421 1.95c.13.073.285.073.407 0l2.072-1.154a.2.2 0 0 0 .106-.179.2.2 0 0 0-.106-.178L30.92 17.16a.21.21 0 0 1-.105-.18v-1.242c0-.074.04-.147.105-.18l1.08-.617a.2.2 0 0 1 .212 0l1.081.618c.065.04.106.105.106.179v.975c0 .073.04.146.105.178.065.041.146.041.212 0z"
    />
    <path
      fill="#539E43"
      d="M32.083 15.51a.07.07 0 0 1 .081 0l.659.382c.024.016.04.04.04.073v.764a.09.09 0 0 1-.04.073l-.659.382a.07.07 0 0 1-.08 0l-.66-.382a.09.09 0 0 1-.04-.073v-.764c0-.033.017-.057.04-.073z"
    />
    <path
      fill="url(#a)"
      d="M13.498 12.048a.42.42 0 0 0-.414 0l-3.422 1.975a.4.4 0 0 0-.203.357v3.958c0 .146.082.284.203.357l3.422 1.975a.42.42 0 0 0 .414 0l3.421-1.975a.4.4 0 0 0 .203-.357V14.38a.42.42 0 0 0-.203-.357z"
    />
    <mask
      id="b"
      width={9}
      height={10}
      x={9}
      y={11}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        d="M13.498 12.048a.42.42 0 0 0-.414 0l-3.422 1.975a.4.4 0 0 0-.203.357v3.958c0 .146.082.284.203.357l3.422 1.975a.42.42 0 0 0 .414 0l3.421-1.975a.4.4 0 0 0 .203-.357V14.38a.42.42 0 0 0-.203-.357z"
      />
    </mask>
    <g mask="url(#b)">
      <path
        fill="url(#c)"
        d="m16.928 14.023-3.438-1.975a.6.6 0 0 0-.106-.04l-3.852 6.598a.4.4 0 0 0 .114.098l3.438 1.974a.4.4 0 0 0 .317.041l3.616-6.615a.4.4 0 0 0-.09-.081"
      />
    </g>
    <mask
      id="d"
      width={9}
      height={10}
      x={9}
      y={11}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        d="M13.498 12.048a.42.42 0 0 0-.414 0l-3.422 1.975a.4.4 0 0 0-.203.357v3.958c0 .146.082.284.203.357l3.422 1.975a.42.42 0 0 0 .414 0l3.421-1.975a.4.4 0 0 0 .203-.357V14.38a.42.42 0 0 0-.203-.357z"
      />
    </mask>
    <g fillRule="evenodd" clipRule="evenodd" mask="url(#d)">
      <path
        fill="url(#e)"
        d="M16.936 18.696a.46.46 0 0 0 .203-.26l-3.771-6.437a.4.4 0 0 0-.293.05l-3.413 1.966 3.682 6.712a.6.6 0 0 0 .154-.049z"
      />
      <path
        fill="url(#f)"
        d="m16.936 18.696-3.43 1.974a.5.5 0 0 1-.154.05l.065.121 3.803-2.202v-.049l-.098-.163a.38.38 0 0 1-.186.269"
      />
      <path
        fill="url(#g)"
        d="m16.936 18.696-3.43 1.974a.5.5 0 0 1-.154.05l.065.121 3.803-2.202v-.049l-.098-.163a.38.38 0 0 1-.186.269"
      />
    </g>
    <defs>
      <linearGradient
        id="a"
        x1={532.004}
        x2={157.007}
        y1={164.684}
        y2={753.914}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41873F" />
        <stop offset={0.329} stopColor="#418B3D" />
        <stop offset={0.635} stopColor="#419637" />
        <stop offset={0.932} stopColor="#3FA92D" />
        <stop offset={1} stopColor="#3FAE2A" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={333.439}
        x2={1272.6}
        y1={493.529}
        y2={-16.721}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.138} stopColor="#41873F" />
        <stop offset={0.403} stopColor="#54A044" />
        <stop offset={0.714} stopColor="#66B848" />
        <stop offset={0.908} stopColor="#6CC04A" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={-23.152}
        x2={768.509}
        y1={448.723}
        y2={448.723}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.092} stopColor="#6CC04A" />
        <stop offset={0.286} stopColor="#66B848" />
        <stop offset={0.597} stopColor="#54A044" />
        <stop offset={0.862} stopColor="#41873F" />
      </linearGradient>
      <linearGradient
        id="f"
        x1={-388.4}
        x2={403.252}
        y1={139.769}
        y2={139.769}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.092} stopColor="#6CC04A" />
        <stop offset={0.286} stopColor="#66B848" />
        <stop offset={0.597} stopColor="#54A044" />
        <stop offset={0.862} stopColor="#41873F" />
      </linearGradient>
      <linearGradient
        id="g"
        x1={518.585}
        x2={318.029}
        y1={-490.997}
        y2={559.912}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41873F" />
        <stop offset={0.329} stopColor="#418B3D" />
        <stop offset={0.635} stopColor="#419637" />
        <stop offset={0.932} stopColor="#3FA92D" />
        <stop offset={1} stopColor="#3FAE2A" />
      </linearGradient>
    </defs>
  </svg>
);

const MongoDBIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#13AA52"
        d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18"
      />
      <path
        fill="#fff"
        d="M22.811 15.8c-1.137-5.017-3.823-6.667-4.113-7.297-.316-.445-.637-1.236-.637-1.236l-.023-.06c-.033.445-.05.616-.47 1.065-.652.509-3.992 3.312-4.264 9.013-.253 5.317 3.841 8.485 4.395 8.89l.063.044v-.004c.003.027.175 1.266.296 2.578h.434q.154-1.393.457-2.76l.035-.023q.372-.267.707-.579l.026-.023a10.2 10.2 0 0 0 3.272-7.612 12 12 0 0 0-.178-1.995m-4.799 7.372s0-7.457.246-7.456c.192 0 .44 9.62.44 9.62-.34-.042-.686-1.584-.686-2.164"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);

const FigmaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      fill="#1ABCFE"
      fillRule="evenodd"
      d="M18 18a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0"
      clipRule="evenodd"
    />
    <path
      fill="#0ACF83"
      fillRule="evenodd"
      d="M9 27a4.5 4.5 0 0 1 4.5-4.5H18V27a4.5 4.5 0 0 1-9 0"
      clipRule="evenodd"
    />
    <path
      fill="#FF7262"
      fillRule="evenodd"
      d="M18 4.5v9h4.5a4.5 4.5 0 0 0 0-9z"
      clipRule="evenodd"
    />
    <path
      fill="#F24E1E"
      fillRule="evenodd"
      d="M9 9a4.5 4.5 0 0 0 4.5 4.5H18v-9h-4.5A4.5 4.5 0 0 0 9 9"
      clipRule="evenodd"
    />
    <path
      fill="#A259FF"
      fillRule="evenodd"
      d="M9 18a4.5 4.5 0 0 0 4.5 4.5H18v-9h-4.5A4.5 4.5 0 0 0 9 18"
      clipRule="evenodd"
    />
  </svg>
);

const PostmanIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M36 18c0-9.941-8.059-18-18-18S0 8.059 0 18s8.059 18 18 18 18-8.059 18-18"
      />
      <path
        fill="#FF6C37"
        d="M32.877 19.905c1.05-8.219-4.754-15.733-12.957-16.782C11.716 2.073 4.172 7.877 3.123 16.08S7.877 31.813 16.08 32.877c8.219 1.05 15.733-4.754 16.797-12.972"
      />
      <path
        fill="#fff"
        d="m23.414 12.63-6.329 6.33-1.785-1.785c6.224-6.224 6.84-5.684 8.114-4.544"
      />
      <path
        fill="#FF6C37"
        d="M17.085 19.11a.14.14 0 0 1-.105-.045l-1.8-1.785a.145.145 0 0 1 0-.21c6.33-6.329 6.99-5.729 8.324-4.53.03.03.045.06.045.106a.14.14 0 0 1-.045.105l-6.329 6.314c-.015.03-.06.045-.09.045m-1.575-1.935 1.575 1.575 6.104-6.104c-1.11-.99-1.86-1.29-7.679 4.53"
      />
      <path fill="#fff" d="m18.9 20.775-1.725-1.725 6.329-6.33c1.695 1.71-.84 4.485-4.604 8.054" />
      <path
        fill="#FF6C37"
        d="M18.9 20.924a.14.14 0 0 1-.105-.045l-1.725-1.724c-.03-.03-.03-.06-.03-.105s.015-.075.045-.105l6.33-6.33c.06-.06.15-.06.21 0 .389.36.599.87.584 1.396-.03 1.664-1.92 3.779-5.19 6.868a.24.24 0 0 1-.12.045m-1.515-1.874c.96.974 1.365 1.364 1.515 1.514 2.52-2.4 4.964-4.859 4.98-6.553.014-.39-.136-.78-.39-1.08z"
      />
      <path
        fill="#fff"
        d="m15.33 17.22 1.275 1.275q.045.045 0 .09c-.015.015-.015.015-.03.015l-2.64.57a.26.26 0 0 1-.284-.21.22.22 0 0 1 .06-.195l1.53-1.53c.03-.03.075-.045.09-.015"
      />
      <path
        fill="#FF6C37"
        d="M13.89 19.32a.39.39 0 0 1-.39-.405.4.4 0 0 1 .12-.285l1.53-1.53a.23.23 0 0 1 .3 0l1.275 1.275c.09.075.09.21 0 .3a.24.24 0 0 1-.105.06l-2.64.57c-.03 0-.06.015-.09.015m1.395-1.935-1.47 1.47c-.03.03-.044.075-.014.12.015.045.06.06.105.045l2.474-.54z"
      />
      <path
        fill="#fff"
        d="M26.758 9.121c-.96-.93-2.504-.9-3.434.075s-.9 2.505.075 3.435c.795.765 1.995.9 2.94.33l-1.71-1.71z"
      />
      <path
        fill="#FF6C37"
        d="M25.079 13.456a2.58 2.58 0 1 1 1.784-4.44c.03.03.046.06.046.105a.14.14 0 0 1-.046.105l-2.024 2.025 1.59 1.59c.06.06.06.15 0 .21l-.03.03c-.39.24-.855.375-1.32.375m0-4.844c-1.26 0-2.28 1.02-2.265 2.28 0 1.259 1.02 2.279 2.28 2.264.345 0 .69-.075 1.005-.24l-1.575-1.56a.14.14 0 0 1-.045-.105c0-.045.015-.075.045-.105l2.01-2.01a2.22 2.22 0 0 0-1.455-.524"
      />
      <path
        fill="#fff"
        d="m26.804 9.166-.03-.03-2.145 2.115 1.695 1.695a2.8 2.8 0 0 0 .464-.36c.96-.945.96-2.475.015-3.42"
      />
      <path
        fill="#FF6C37"
        d="M26.338 13.11a.14.14 0 0 1-.105-.044l-1.71-1.71a.14.14 0 0 1-.044-.105c0-.045.015-.075.045-.105l2.13-2.13c.06-.06.15-.06.21 0l.044.03a2.594 2.594 0 0 1 .015 3.645c-.15.15-.315.285-.495.39-.045.015-.075.03-.09.03m-1.5-1.859 1.515 1.515c.12-.075.24-.18.33-.27.855-.855.9-2.25.075-3.15z"
      />
      <path
        fill="#fff"
        d="M23.669 12.9a.923.923 0 0 0-1.305 0l-5.654 5.655.945.945 5.984-5.25c.39-.33.42-.914.09-1.304a.2.2 0 0 1-.06-.045"
      />
      <path
        fill="#FF6C37"
        d="M17.64 19.65a.14.14 0 0 1-.105-.045l-.945-.945a.145.145 0 0 1 0-.21l5.654-5.654c.42-.42 1.095-.42 1.515 0s.42 1.095 0 1.515l-.045.045-5.984 5.249q-.023.045-.09.045m-.72-1.095.735.735 5.879-5.16c.33-.27.36-.764.09-1.094s-.765-.36-1.095-.09a.2.2 0 0 1-.06.045z"
      />
      <path
        fill="#fff"
        d="M12.376 24.989c-.06.03-.09.09-.075.15l.255 1.08c.06.15-.03.33-.195.374a.3.3 0 0 1-.33-.09l-1.65-1.634 5.384-5.384 1.86.03 1.26 1.26c-.3.254-2.115 2.009-6.509 4.214"
      />
      <path
        fill="#FF6C37"
        d="M12.256 26.743a.4.4 0 0 1-.315-.135l-1.635-1.634a.14.14 0 0 1-.044-.105c0-.045.014-.075.044-.105l5.385-5.384a.16.16 0 0 1 .104-.045l1.86.03c.045 0 .075.015.105.045l1.26 1.26a.17.17 0 0 1 .045.12c0 .044-.015.074-.06.104l-.105.09c-1.59 1.395-3.75 2.79-6.434 4.125l.255 1.064a.47.47 0 0 1-.225.51.5.5 0 0 1-.24.06m-1.65-1.874 1.545 1.53c.045.074.135.104.21.06.075-.046.105-.136.06-.21l-.255-1.08a.27.27 0 0 1 .15-.315c2.655-1.335 4.8-2.715 6.374-4.08l-1.11-1.11-1.724-.03z"
      />
      <path
        fill="#fff"
        d="m9.107 26.158 1.29-1.29 1.919 1.92-3.06-.21a.24.24 0 0 1-.21-.27c0-.06.016-.12.06-.15"
      />
      <path
        fill="#FF6C37"
        d="m12.316 26.923-3.074-.21c-.225-.015-.375-.21-.36-.435.015-.09.045-.18.12-.24l1.29-1.29c.06-.06.15-.06.21 0l1.919 1.92c.045.045.06.105.03.165q-.045.09-.135.09m-1.92-1.844-1.184 1.184c-.045.03-.045.105 0 .135.015.015.03.03.06.03l2.654.18zM15.24 20.175a.15.15 0 0 1-.15-.15c0-.045.016-.075.046-.105l1.454-1.455c.06-.06.15-.06.21 0l.945.945c.045.045.06.09.045.15a.17.17 0 0 1-.12.105l-2.4.51zm1.455-1.395-.99.99 1.62-.345z"
      />
      <path fill="#fff" d="m17.625 19.515-1.65.36a.223.223 0 0 1-.21-.375l.915-.915z" />
      <path
        fill="#FF6C37"
        d="M15.946 20.025a.37.37 0 0 1-.375-.375c0-.105.045-.195.104-.27l.915-.915c.06-.06.15-.06.21 0l.945.945c.045.045.06.09.045.15a.17.17 0 0 1-.12.105l-1.65.36zm.75-1.245-.81.81c-.03.03-.03.06-.015.09q.021.045.09.045l1.38-.3zM26.818 10.606c-.03-.09-.135-.135-.225-.105s-.134.135-.105.225c0 .015.015.03.015.045a.56.56 0 0 1-.06.57.18.18 0 0 0 .015.24c.075.06.18.045.24-.03.225-.285.27-.645.12-.945"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);

const RenderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={37} fill="none" {...props}>
    <path fill="#fff" d="M0 .813h36v36H0z" />
    <path
      fill="#000"
      d="M24.328 4.511h1.143l.281.038.51.112.299.056.632.224.475.206.51.261.369.224.387.262.28.224.247.224.545.58.123.149.246.317.21.318.212.336.246.467.176.43.175.523.106.336.07.355.088.467.07.692v.579l-.035.56-.052.449-.141.672-.21.691-.177.449-.175.392-.176.318-.123.205-.176.243-.229.299-.228.28-.158.187-.387.411-.193.168-.229.187-.299.206-.44.28-.404.224-.439.224-.404.168-.545.168-.563.131-.474.056-.58.019-3.657.018-.386.057-.405.093-.404.13-.37.188-.21.149-.158.13-.352.337-.123.15-.158.186-.246.411-.158.3-.141.373-.088.373-.07.412-.018 11.097H4.237V21.194l.017-3.12.017-.317.018-.112.158.056.317.15.422.205.632.261.598.187.879.224.527.075.334.056.176.037.176.02h.668l.369-.038.685-.112.528-.094.773-.187.545-.168.475-.186.44-.206.35-.187.405-.243.58-.41.334-.262.281-.224.545-.542.44-.467.158-.206.229-.299.228-.336.193-.317.211-.374.211-.411.246-.523.194-.486.175-.523.123-.467.159-.729.088-.635.14-.616.211-.673.194-.467.263-.504.158-.262.159-.224.228-.299.14-.187.159-.187.281-.317.281-.3.3-.242.421-.299.387-.243.316-.187.457-.224.422-.168.457-.15.668-.149.352-.056z"
    />
  </svg>
);

const GitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <path
      fill="#fff"
      d="M11.565 10.633a5.625 5.625 0 1 0-4.815.15v14.435A5.626 5.626 0 0 0 9 36a5.625 5.625 0 0 0 2.25-10.782v-8.536l4.693 4.693h5.9a5.626 5.626 0 1 0 0-4.5h-4.036z"
    />
  </svg>
);

const NetlifyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#20C6B7"
        d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18"
      />
      <path
        fill="#fff"
        d="m22.04 15.247-.008-.003q-.005-.001-.01-.007c-.01-.01-.014-.028-.014-.042l.362-2.219 1.701 1.702-1.768.752q-.006.005-.014.004h-.007c-.003 0-.003-.004-.01-.007a.8.8 0 0 0-.233-.18m2.467-.137 1.821 1.821c.377.38.567.566.637.788a1 1 0 0 1 .024.098l-4.348-1.845q-.004-.002-.007-.004c-.018-.007-.04-.014-.04-.032 0-.017.022-.024.04-.031l.007-.004zm2.409 3.287c-.095.176-.278.359-.588.672l-2.053 2.05-2.65-.552-.015-.004c-.024-.003-.049-.007-.049-.028a.8.8 0 0 0-.306-.56c-.01-.01-.007-.027-.003-.041v-.007l.5-3.062.003-.011c.003-.025.007-.05.028-.05a.83.83 0 0 0 .545-.312q.004-.007.014-.014c.014-.007.031 0 .049.007zm-3.112 3.196-3.375 3.375.577-3.547v-.004q0-.006.003-.014c.004-.01.018-.017.029-.02l.006-.004a.86.86 0 0 0 .327-.243.07.07 0 0 1 .043-.028h.014zm-4.085 4.085-.38.38-4.204-6.075q-.002-.004-.004-.007c-.007-.01-.014-.018-.01-.028q0-.01.01-.021l.004-.007q.02-.029.035-.057l.01-.017q.01-.016.025-.028a.06.06 0 0 1 .035 0l4.658.96a.1.1 0 0 1 .035.014c.008.006.008.014.011.02.067.25.246.454.482.553.014.007.007.02 0 .035a.1.1 0 0 0-.007.02c-.064.363-.566 3.432-.7 4.258m-.794.795c-.282.277-.447.425-.633.485a.9.9 0 0 1-.566 0c-.218-.07-.408-.257-.788-.636l-4.218-4.223 1.103-1.708c.004-.007.01-.018.018-.021.01-.007.028-.004.042 0 .253.077.524.063.77-.039.014-.004.025-.007.035 0l.014.014zm-6.613-4.781-.967-.967 1.912-.816q.007-.004.014-.003c.018 0 .025.017.036.031q.026.044.06.088l.006.007c.007.007.004.018-.003.025zm-1.4-1.4-1.227-1.227a7 7 0 0 1-.464-.488l3.727.773q.006-.001.014.004c.025.003.05.007.05.028 0 .024-.029.035-.053.042l-.011.003c.003.004-2.036.865-2.036.865M9.01 17.951a.9.9 0 0 1 .043-.232c.07-.218.256-.408.636-.788l1.568-1.568q1.08 1.573 2.173 3.14c.014.017.028.035.01.05a1.3 1.3 0 0 0-.186.249.06.06 0 0 1-.025.028.02.02 0 0 1-.02 0zm2.665-3.006 2.11-2.11c.197.088.917.39 1.564.665.489.207.932.394 1.072.457.015.007.029.01.032.025a.04.04 0 0 1 0 .028.94.94 0 0 0 .246.858c.014.014 0 .035-.01.052l-.007.011-2.141 3.315c-.008.01-.011.018-.021.025s-.029.003-.04 0a1 1 0 0 0-.256-.035c-.077 0-.162.014-.246.028-.01 0-.018.003-.024-.004q-.012-.01-.022-.024zm2.535-2.535 2.728-2.728c.376-.376.566-.566.788-.636a.9.9 0 0 1 .566 0c.218.07.408.256.787.636l.59.59-1.94 3.007c-.003.007-.01.017-.017.02-.01.008-.029.004-.043 0a.99.99 0 0 0-.9.173c-.014.014-.031.007-.045 0-.26-.109-2.233-.942-2.514-1.062m5.871-1.726 1.793 1.793-.432 2.675v.008q.001.008-.004.017c-.003.01-.014.01-.024.014a.9.9 0 0 0-.257.127q-.005.003-.01.007a.02.02 0 0 1-.018.01q-.01 0-.021-.003l-2.732-1.16-.003-.004c-.018-.007-.04-.014-.04-.032a1.1 1.1 0 0 0-.143-.428c-.014-.022-.028-.046-.018-.067zm-1.846 4.04 2.56 1.082c.014.007.028.014.035.029q.006.01 0 .028a1 1 0 0 0-.014.123v.07c0 .017-.018.025-.035.032l-.004.003c-.404.172-5.695 2.43-5.702 2.43s-.018 0-.025-.008c-.014-.014 0-.035.014-.052l.007-.01 2.103-3.26.003-.007c.01-.021.025-.042.05-.042l.02.003c.05.007.092.014.134.014a.95.95 0 0 0 .795-.421.04.04 0 0 1 .017-.018c.007-.007.028-.004.042.003m-2.931 4.313 5.765-2.457q0-.002.018.007c.031.032.06.053.084.074l.014.007c.01.007.025.014.025.024v.01l-.492 3.035-.004.01c-.003.025-.007.05-.028.05a.8.8 0 0 0-.643.397l-.004.003q-.01.016-.025.029a.05.05 0 0 1-.031 0l-4.599-.95c-.01.004-.077-.239-.08-.239"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);

const useTechSVG = (): {
  frontend: TechItem[];
  backend: TechItem[];
  devtools: TechItem[];
} => {
  return {
    frontend: [
      { name: 'TypeScript', icon: <TypeScriptIcon /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Next.js', icon: <NextIcon /> },
      { name: 'Tailwind', icon: <TailwindIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
    ],
    backend: [
      { name: 'Express', icon: <ExpressIcon /> },
      { name: 'Node.js', icon: <NodeJSIcon /> },
      { name: 'MongoDB', icon: <MongoDBIcon /> },
    ],
    devtools: [
      { name: 'Postman', icon: <PostmanIcon /> },
      { name: 'Render', icon: <RenderIcon /> },
      { name: 'Netlify', icon: <NetlifyIcon /> },
      { name: 'Git', icon: <GitIcon /> },
    ],
  };
};

export default useTechSVG;
