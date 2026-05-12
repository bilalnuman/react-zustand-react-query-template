import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export const Icons = {
  dashboard: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M11.332 6.66659H12.6654C13.9987 6.66659 14.6654 5.99992 14.6654 4.66659V3.33325C14.6654 1.99992 13.9987 1.33325 12.6654 1.33325H11.332C9.9987 1.33325 9.33203 1.99992 9.33203 3.33325V4.66659C9.33203 5.99992 9.9987 6.66659 11.332 6.66659ZM3.33203 14.6666H4.66536C5.9987 14.6666 6.66536 13.9999 6.66536 12.6666V11.3333C6.66536 9.99992 5.9987 9.33325 4.66536 9.33325H3.33203C1.9987 9.33325 1.33203 9.99992 1.33203 11.3333V12.6666C1.33203 13.9999 1.9987 14.6666 3.33203 14.6666ZM3.9987 6.66659C4.70594 6.66659 5.38422 6.38563 5.88432 5.88554C6.38441 5.38544 6.66536 4.70716 6.66536 3.99992C6.66536 3.29267 6.38441 2.6144 5.88432 2.1143C5.38422 1.6142 4.70594 1.33325 3.9987 1.33325C3.29145 1.33325 2.61318 1.6142 2.11308 2.1143C1.61298 2.6144 1.33203 3.29267 1.33203 3.99992C1.33203 4.70716 1.61298 5.38544 2.11308 5.88554C2.61318 6.38563 3.29145 6.66659 3.9987 6.66659ZM11.9987 14.6666C12.7059 14.6666 13.3842 14.3856 13.8843 13.8855C14.3844 13.3854 14.6654 12.7072 14.6654 11.9999C14.6654 11.2927 14.3844 10.6144 13.8843 10.1143C13.3842 9.6142 12.7059 9.33325 11.9987 9.33325C11.2915 9.33325 10.6132 9.6142 10.1131 10.1143C9.61298 10.6144 9.33203 11.2927 9.33203 11.9999C9.33203 12.7072 9.61298 13.3854 10.1131 13.8855C10.6132 14.3856 11.2915 14.6666 11.9987 14.6666Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  file: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M14.6654 7.33325V11.3333C14.6654 13.9999 13.9987 14.6666 11.332 14.6666H4.66536C1.9987 14.6666 1.33203 13.9999 1.33203 11.3333V4.66659C1.33203 1.99992 1.9987 1.33325 4.66536 1.33325H5.66536C6.66536 1.33325 6.88536 1.62659 7.26536 2.13325L8.26536 3.46659C8.5187 3.79992 8.66536 3.99992 9.33203 3.99992H11.332C13.9987 3.99992 14.6654 4.66659 14.6654 7.33325Z" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  createClosing: ({ size = 16, style, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.00063 5.66667V2M8.00063 5.66667C7.38179 5.66667 6.78829 5.9125 6.35071 6.35008C5.91312 6.78767 5.66729 7.38116 5.66729 8C5.66729 8.61884 5.91312 9.21233 6.35071 9.64992C6.78829 10.0875 7.38179 10.3333 8.00063 10.3333M8.00063 5.66667C8.61946 5.66667 9.21296 5.9125 9.65054 6.35008C10.0881 6.78767 10.334 7.38116 10.334 8C10.334 8.61884 10.0881 9.21233 9.65054 9.64992C9.21296 10.0875 8.61946 10.3333 8.00063 10.3333M8.00063 14V10.3333M6.66729 2H9.33396M6.66729 14H9.33396M5.98063 6.83333L2.80729 5M13.194 11L10.0206 9.16667M2.14062 6.15333L3.47396 3.84667M12.5273 12.1533L13.8606 9.84667M13.194 5L10.0206 6.83333M5.98063 9.16667L2.80729 11M13.8606 6.15333L12.5273 3.84667M3.47396 12.1533L2.14062 9.84667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  kpis: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M14.6654 8.66659V5.99992C14.6654 2.66659 13.332 1.33325 9.9987 1.33325H5.9987C2.66536 1.33325 1.33203 2.66659 1.33203 5.99992V9.99992C1.33203 13.3333 2.66536 14.6666 5.9987 14.6666H8.66536" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.88672 9.66009L6.47339 7.60009C6.70005 7.30675 7.12005 7.25342 7.41339 7.48009L8.63339 8.44009C8.92672 8.66675 9.34672 8.61342 9.57339 8.32675L11.1134 6.34009M12.9867 10.5468L13.1734 10.9268C13.2667 11.1134 13.5001 11.2868 13.7067 11.3268L13.9601 11.3668C14.7201 11.4934 14.9001 12.0534 14.3534 12.6068L14.1201 12.8401C13.9667 13.0001 13.8801 13.3068 13.9267 13.5201L13.9601 13.6601C14.1667 14.5801 13.6801 14.9334 12.8801 14.4534L12.7067 14.3534C12.5001 14.2334 12.1667 14.2334 11.9601 14.3534L11.7867 14.4534C10.9801 14.9401 10.4934 14.5801 10.7067 13.6601L10.7401 13.5201C10.7867 13.3068 10.7001 13.0001 10.5467 12.8401L10.3134 12.6068C9.76672 12.0534 9.94672 11.4934 10.7067 11.3668L10.9601 11.3268C11.1601 11.2934 11.4001 11.1134 11.4934 10.9268L11.6801 10.5468C12.0401 9.82009 12.6267 9.82009 12.9867 10.5468Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  files: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M14.4388 6.96009L13.7855 9.74675C13.2255 12.1534 12.1188 13.1268 10.0388 12.9268C9.70548 12.9001 9.34548 12.8401 8.95882 12.7468L7.83882 12.4801C5.05882 11.8201 4.19882 10.4468 4.85215 7.66009L5.50548 4.86675C5.63882 4.30009 5.79882 3.80675 5.99882 3.40009C6.77882 1.78675 8.10548 1.35342 10.3322 1.88009L11.4455 2.14009C14.2388 2.79342 15.0922 4.17342 14.4388 6.96009Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.42689 5.68657L11.6602 6.50657M7.77356 8.26657L9.70689 8.7599M10.0402 12.9266C9.62689 13.2066 9.10689 13.4399 8.47356 13.6466L7.42023 13.9932C4.77356 14.8466 3.38023 14.1332 2.52023 11.4866L1.66689 8.85324C0.813561 6.20657 1.52023 4.80657 4.16689 3.95324L5.22023 3.60657C5.49356 3.5199 5.75356 3.44657 6.00023 3.3999C5.80023 3.80657 5.64023 4.2999 5.50689 4.86657L4.85356 7.6599C4.20023 10.4466 5.06023 11.8199 7.84023 12.4799L8.96023 12.7466C9.34689 12.8399 9.70689 12.8999 10.0402 12.9266Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  commission: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <g clipPath="url(#clip0_5163_3001)">
        <mask id="mask0_5163_3001" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <path d="M16 0H0V16H16V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_5163_3001)">
          <path d="M5.54688 10.1798L9.90686 5.81982" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.82001 6.91291C6.27288 6.91291 6.63999 6.54583 6.63999 6.09296C6.63999 5.64008 6.27288 5.27295 5.82001 5.27295C5.36713 5.27295 5 5.64008 5 6.09296C5 6.54583 5.36713 6.91291 5.82001 6.91291Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.1794 10.7267C10.6322 10.7267 10.9994 10.3595 10.9994 9.90667C10.9994 9.4538 10.6322 9.08667 10.1794 9.08667C9.72651 9.08667 9.35938 9.4538 9.35938 9.90667C9.35938 10.3595 9.72651 10.7267 10.1794 10.7267Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.66536 3.99943C1.83203 5.11276 1.33203 6.49943 1.33203 7.99943C1.33203 11.6794 4.3187 14.6661 7.9987 14.6661C11.6787 14.6661 14.6654 11.6794 14.6654 7.99943C14.6654 4.31943 11.6787 1.33276 7.9987 1.33276C7.04536 1.33276 6.13203 1.53277 5.31203 1.89944" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5163_3001">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  logout: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M10.1294 9.52319L11.6163 8.03625L10.1294 6.54932M5.66859 8.03625H11.5757M6.83026 12.6481C4.26298 12.6481 2.18359 10.9056 2.18359 8.0014C2.18359 5.09724 4.26298 3.35474 6.83026 3.35474" stroke="currentColor" strokeWidth="0.87125" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  circleCheck: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M8.00065 1.33325C4.31899 1.33325 1.33232 4.31992 1.33232 7.99992C1.33232 11.6799 4.31899 14.6666 8.00065 14.6666C11.6823 14.6666 14.6689 11.6799 14.6689 7.99992C14.6689 4.31992 11.6823 1.33325 8.00065 1.33325ZM11.333 6.66659L7.99967 9.99992L5.66634 7.66659" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  closeCircle: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M8.00065 1.33325C4.31899 1.33325 1.33232 4.31992 1.33232 7.99992C1.33232 11.6799 4.31899 14.6666 8.00065 14.6666C11.6823 14.6666 14.6689 11.6799 14.6689 7.99992C14.6689 4.31992 11.6823 1.33325 8.00065 1.33325ZM10.6663 5.33325L5.333 10.6666M5.333 5.33325L10.6663 10.6666" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  caretDown: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <path d="M4.66699 6.66659L7.99932 9.99992L11.3317 6.66659" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sortIcon: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      style={{ width: size, height: size, ...style }}
      {...props}
      width={size}
      height={size}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"></path>
    </svg>
  ),
  check: ({ size = 16, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  chevronLeft: ({ size = 16, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  chevronRight: ({ size = 16, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  chevronsLeft: ({ size = 16, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m11 17-5-5 5-5m7 10-5-5 5-5" />
    </svg>
  ),
  warning: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size, ...style }}
      {...props}
      stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g id="Warning"><g><g><path d="M12.5,8.752a.5.5,0,0,0-1,0h0v6a.5.5,0,0,0,1,0Z"></path><circle cx="11.999" cy="16.736" r="0.5"></circle></g><path d="M18.642,20.934H5.385A2.5,2.5,0,0,1,3.163,17.29L9.792,4.421a2.5,2.5,0,0,1,4.444,0L20.865,17.29a2.5,2.5,0,0,1-2.223,3.644ZM12.014,4.065a1.478,1.478,0,0,0-1.334.814L4.052,17.748a1.5,1.5,0,0,0,1.333,2.186H18.642a1.5,1.5,0,0,0,1.334-2.186L13.348,4.879A1.478,1.478,0,0,0,12.014,4.065Z"></path></g></g></svg>
  ),
  spinner: ({ size = 16, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size, ...style }}
      {...props}
      stroke="currentColor"
      fill="none"
      strokeWidth="0"
      className={twMerge(props?.className, 'animate-spin')}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor">
      </path>
      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor">

      </path>
    </svg>
  ),
  loading: ({ size = 50, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size, ...style }}
      {...props}
      className={twMerge(props?.className, 'animate-spin')}
      stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M134,32V64a6,6,0,0,1-12,0V32a6,6,0,0,1,12,0Zm39.25,56.75A6,6,0,0,0,177.5,87l22.62-22.63a6,6,0,0,0-8.48-8.48L169,78.5a6,6,0,0,0,4.24,10.25ZM224,122H192a6,6,0,0,0,0,12h32a6,6,0,0,0,0-12Zm-46.5,47A6,6,0,0,0,169,177.5l22.63,22.62a6,6,0,0,0,8.48-8.48ZM128,186a6,6,0,0,0-6,6v32a6,6,0,0,0,12,0V192A6,6,0,0,0,128,186ZM78.5,169,55.88,191.64a6,6,0,1,0,8.48,8.48L87,177.5A6,6,0,1,0,78.5,169ZM70,128a6,6,0,0,0-6-6H32a6,6,0,0,0,0,12H64A6,6,0,0,0,70,128ZM64.36,55.88a6,6,0,0,0-8.48,8.48L78.5,87A6,6,0,1,0,87,78.5Z"></path></svg>
  ),
  settings: ({ size = 50, style, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      style={{ width: size, height: size, ...style }}
      {...props}
      stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="Settings"><g><path d="M12.6,20.936H11.3a.883.883,0,0,1-.852-.654l-.774-2.833-2.5,1.435a.886.886,0,0,1-1.06-.138l-.925-.919a.884.884,0,0,1-.143-1.066l1.469-2.545L6.509,14.2l-2.787-.747a.882.882,0,0,1-.654-.851V11.3a.882.882,0,0,1,.652-.85l2.839-.777L5.12,7.171a.885.885,0,0,1,.141-1.062l.918-.918A.885.885,0,0,1,7.24,5.049L9.792,6.514l.012,0,.745-2.79a.881.881,0,0,1,.851-.655h1.3a.883.883,0,0,1,.852.655l.762,2.838,2.509-1.441a.885.885,0,0,1,1.059.138l.926.919a.882.882,0,0,1,.141,1.067L17.483,9.777l.008.022,2.786.746a.883.883,0,0,1,.653.851v1.3a.883.883,0,0,1-.654.852l-2.837.774,1.439,2.505a.881.881,0,0,1-.141,1.063l-.917.917a.888.888,0,0,1-1.063.141l-2.539-1.462L14.2,17.5l-.745,2.785A.885.885,0,0,1,12.6,20.936Zm-1.21-1h1.119l.738-2.756a.888.888,0,0,1,.528-.592l.134-.052a.873.873,0,0,1,.76.057l2.51,1.445.789-.789-1.423-2.478a.881.881,0,0,1-.048-.78l.052-.125a.875.875,0,0,1,.584-.51l2.8-.749v-1.12l-2.755-.737a.885.885,0,0,1-.592-.529l-.052-.132a.882.882,0,0,1,.057-.763L18.04,6.818l-.8-.79-2.48,1.425a.878.878,0,0,1-.772.052l-.115-.047a.888.888,0,0,1-.518-.588l-.748-2.806H11.492l-.738,2.762a.883.883,0,0,1-.539.6l-.12.045a.874.874,0,0,1-.751-.058L6.822,5.962l-.789.789L7.455,9.227a.886.886,0,0,1,.046.785l-.051.12a.876.876,0,0,1-.579.5l-2.8.758v1.121l2.757.738a.889.889,0,0,1,.591.525l.048.121a.874.874,0,0,1-.055.77L5.958,17.181l.8.791,2.47-1.419a.878.878,0,0,1,.787-.045l.106.044a.874.874,0,0,1,.526.591ZM9.75,17.482l.008,0ZM9.6,17.421l.007,0ZM6.487,14.147h0Zm.044-4.411h0Zm7.724-3.2Z"></path><path d="M12,15a3,3,0,1,1,3-3A3,3,0,0,1,12,15Zm0-5a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path></g></g></svg>
  ),
}
