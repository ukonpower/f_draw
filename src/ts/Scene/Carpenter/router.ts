import * as GLP from 'glpower';

import { DustParticles } from '../Entities/DustParticles';
import { Floor } from '../Entities/Floor';
import { Chopsticks } from '../Entities/Chopsticks';
import { Chahan } from '../Entities/Dishes/Chahan';
import { Ramen } from '../Entities/Dishes/Ramen';
import { Renge } from '../Entities/Renge';
import { Shoyu } from '../Entities/Shoyu';
import { ChahanPara } from '../Entities/Dishes/ChahanPara';
import { Skybox } from '../Entities/Skybox';
import { Gyoza } from '../Entities/Dishes/Gyoza';
import { Menu } from '../Entities/Menu';
import { Chochin } from '../Entities/Chochin';
import { Noren } from '../Entities/Noren';
import { Men } from '../Entities/Dishes/Men';
import { Title } from '../Entities/Title';
import { MainTitle } from '../Entities/MainTitle';

export const router = ( node: GLP.BLidgeNode ) => {

	// class

	if ( node.class == "Skybox" ) {

		return new Skybox();

	} else if ( node.class == "Dust" ) {

		return new DustParticles();

	} else if ( node.class == "Floor" ) {

		return new Floor();

	} else if ( node.class == 'Chop' ) {

		return new Chopsticks();

	} else if ( node.class == "Chahan" ) {

		return new Chahan();

	} else if ( node.class == "Ramen" ) {

		return new Ramen();

	} else if ( node.class == "Renge" ) {

		return new Renge();

	} else if ( node.class == "Shoyu" ) {

		return new Shoyu();

	} else if ( node.class == "ChahanPara" ) {

		return new ChahanPara();

	} else if ( node.class == "Gyoza" ) {

		return new Gyoza();

	} else if ( node.class == "Menu" ) {

		return new Menu();

	} else if ( node.class == "Chochin" ) {

		return new Chochin();

	} else if ( node.class == "Noren" ) {

		return new Noren();

	} else if ( node.class == "Men" ) {

		return new Men();

	} else if ( node.class == "TChahan" ) {

		return new Title( `
		<svg width="1920" height="834" viewBox="0 0 1920 834" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1484.63 514.312C1484.63 530.221 1482.27 538.176 1477.55 538.176C1473.76 538.176 1470.81 534.131 1468.71 526.042C1461.77 498.268 1450.31 477.235 1434.34 462.943C1432.24 462.134 1431.13 459.977 1431 456.472C1431 452.157 1432.24 450 1434.73 450L1438.27 450.809C1444.16 453.505 1451.89 459.707 1461.45 469.415C1471.01 478.853 1477.95 488.29 1482.27 497.728C1483.84 501.503 1484.63 507.031 1484.63 514.312ZM1574.79 503.795C1575.84 503.795 1576.36 506.087 1576.36 510.672C1576.36 515.256 1576.17 518.761 1575.77 521.188C1560.45 587.253 1536.88 644.553 1505.06 693.091C1501.13 699.293 1491.17 711.831 1475.2 730.707L1469.3 737.583C1465.24 742.437 1462.43 744.864 1460.86 744.864C1459.29 744.864 1457.98 744.19 1456.93 742.841C1451.69 737.988 1447.24 730.977 1443.57 721.809C1439.9 712.64 1437.42 704.146 1436.11 696.327C1434.8 688.507 1434.14 683.653 1434.14 681.765L1434.34 677.721C1435.25 673.945 1436.3 672.058 1437.48 672.058C1438.66 672.058 1439.51 672.867 1440.03 674.485C1440.69 676.103 1441.47 679.069 1442.39 683.383C1445.4 695.518 1450.12 701.585 1456.54 701.585C1456.67 701.585 1456.8 701.585 1456.93 701.585C1460.86 701.585 1464.13 700.102 1466.75 697.135L1490.52 675.294C1499.42 662.62 1509.31 647.789 1520.18 630.801C1540.74 597.904 1556.92 560.018 1568.7 517.143C1571.19 508.245 1573.22 503.795 1574.79 503.795Z" fill="#00FF00"/>
		<path d="M1258.45 484.047C1258.45 480.813 1259.3 479.196 1261.01 479.196C1265.74 479.196 1271.65 483.508 1278.74 492.133C1285.96 500.759 1289.58 507.497 1289.58 512.349C1289.58 514.505 1288.85 517.739 1287.41 522.052C1285.96 526.365 1285.18 529.195 1285.04 530.542C1283.86 544.289 1277.16 577.576 1264.95 630.405C1257.07 664.097 1246.82 694.151 1234.21 720.565C1231.33 726.495 1228.57 729.46 1225.94 729.46C1223.31 729.46 1222 727.169 1222 722.587C1222 719.891 1223.64 714.636 1226.93 706.819C1238.48 678.787 1248.01 647.117 1255.49 611.807C1262.58 575.42 1267.05 543.884 1268.89 517.2C1269.02 515.044 1269.09 512.079 1269.09 508.306C1269.09 504.263 1268.5 500.624 1267.31 497.389C1266.26 494.155 1265.21 492.268 1264.16 491.729L1260.42 488.899C1258.97 487.821 1258.32 486.204 1258.45 484.047ZM1389.86 703.18C1389.86 713.423 1387.82 718.544 1383.75 718.544C1382.96 718.544 1382.11 718.005 1381.19 716.927L1377.25 713.288C1372.65 708.436 1369.83 698.329 1368.78 682.965C1367.46 667.601 1364.18 646.578 1358.92 619.894C1346.18 558.709 1330.42 512.349 1311.64 480.813C1309.15 476.231 1307.9 471.783 1307.9 467.471C1307.9 463.158 1309.21 461.002 1311.84 461.002C1312.89 461.002 1315.25 463.428 1318.93 468.279C1331.93 487.686 1345.99 522.052 1361.09 571.377C1371.99 603.452 1380.6 638.087 1386.9 675.283C1388.87 686.334 1389.86 695.633 1389.86 703.18Z" fill="#00FF00"/>
		<path d="M767.964 251.829C748.93 251.829 731.144 257.083 714.605 267.591C711.717 267.591 708.829 265.436 705.941 261.125C700.691 252.502 696.621 243.341 693.733 233.641C690.977 223.672 689.599 216.935 689.599 213.433C689.599 209.93 690.321 208.178 691.765 208.178C693.34 208.178 694.259 208.583 694.521 209.391C694.915 210.199 695.899 212.355 697.475 215.858C701.675 225.288 718.543 230.004 748.077 230.004C786.669 230.004 812.463 225.019 825.458 215.049C826.508 214.241 827.558 213.837 828.608 213.837C829.658 213.837 831.562 215.319 834.318 218.283C842.063 225.827 845.935 232.698 845.935 238.895C845.935 244.823 844.426 249.943 841.407 254.254C838.519 258.295 835.565 260.316 832.546 260.316C817.451 254.658 799.796 251.829 779.581 251.829H767.964Z" fill="#FF0000"/>
		<path d="M531.738 173.012H528.978C526.086 173.012 524.641 170.994 524.641 166.959C524.641 164.538 526.546 162.251 530.358 160.099C534.3 157.678 538.243 156.467 542.186 156.467C546.26 156.467 549.677 156.736 552.437 157.274C555.328 157.812 556.774 159.695 556.774 162.924V170.591C556.774 181.083 557.694 192.92 559.534 206.102L561.702 223.454C584.964 210.541 600.538 198.435 608.423 187.136C611.052 183.37 612.892 181.486 613.943 181.486C617.229 181.486 621.96 185.387 628.137 193.189C629.977 195.61 631.291 197.628 632.079 199.242C636.416 206.237 638.585 211.348 638.585 214.576C638.585 218.881 636.154 222.647 631.291 225.875C626.56 229.104 623.471 231.794 622.026 233.946C620.711 235.829 619.2 238.654 617.491 242.42L606.255 265.018L587.527 304.161C587.001 305.237 586.476 305.641 585.95 305.372C584.636 305.372 583.978 304.161 583.978 301.74C583.978 301.202 584.373 299.722 585.161 297.301L592.85 273.896C600.341 251.298 604.349 234.215 604.875 222.647C590.155 228.566 576.684 235.291 564.462 242.824L568.011 267.439C571.033 288.692 572.873 300.798 573.53 303.758L581.613 342.094C584.241 355.007 586.804 366.575 589.301 376.798C591.798 387.02 593.112 394.957 593.244 400.606C593.244 409.484 590.812 413.923 585.95 413.923C581.219 413.923 577.276 409.887 574.122 401.817C573.07 399.127 572.019 389.845 570.968 373.973C569.916 358.1 565.448 325.145 557.562 275.107L553.62 250.491C542.843 258.024 534.366 265.825 528.189 273.896L525.626 274.703C522.735 274.703 519.121 271.744 514.784 265.825L511.63 262.597C508.081 258.562 505.19 253.854 502.956 248.473C500.853 242.824 499.802 238.923 499.802 236.771C499.802 232.197 500.787 229.911 502.759 229.911C503.547 229.911 504.467 230.583 505.519 231.928C508.41 236.502 511.564 238.788 514.981 238.788H520.895C527.335 238.788 537.06 235.695 550.071 229.507L548.494 221.436C543.5 194.265 539.492 178.931 536.469 175.433C534.892 173.819 533.315 173.012 531.738 173.012Z" fill="#FF0000"/>
		<path d="M321.673 153.211H321.082C319.636 153.211 318.453 152.266 317.533 150.378C316.613 148.489 316.153 147.005 316.153 145.926V143.902C316.153 139.855 317.533 137.832 320.293 137.832C320.95 137.832 321.476 137.966 321.871 138.236C344.61 133.649 359.135 129.333 365.444 125.285L367.219 124.476L369.585 123.666C378.917 120.699 391.47 110.446 407.243 92.9081C408.558 90.7496 409.215 88.726 409.215 86.8373C409.215 84.6788 408.163 82.5204 406.06 80.3619C403.957 77.9336 402.906 75.7751 402.906 73.8864C402.906 71.7279 403.629 70.6487 405.074 70.6487C406.52 70.6487 408.558 71.4581 411.187 73.077C413.947 74.6959 416.51 77.5289 418.876 81.576C423.871 89.9402 426.368 97.36 426.368 103.835C426.368 110.041 425.514 113.683 423.805 114.763C423.017 115.572 421.439 116.517 419.073 117.596C416.839 118.405 414.933 119.889 413.355 122.048L395.808 134.594C397.122 136.213 397.779 138.236 397.779 140.665C397.779 143.093 396.662 146.061 394.427 149.568C392.324 152.806 391.273 157.393 391.273 163.329C391.273 164.948 391.339 166.431 391.47 167.781V209.871C397.779 208.792 408.229 205.419 422.819 199.753C426.368 198.404 431.035 194.492 436.818 188.016C438.133 186.667 439.447 185.993 440.761 185.993L444.31 187.612C453.511 196.246 458.112 204.07 458.112 211.085C458.112 214.862 456.6 218.235 453.577 221.203C450.685 223.901 448.648 225.25 447.465 225.25H445.296C445.033 224.98 442.996 224.845 439.184 224.845C435.504 224.845 430.114 224.98 423.016 225.25H422.425C417.824 225.25 407.506 226.734 391.47 229.702C391.207 255.874 389.761 277.459 387.132 294.457C377.406 360.56 357.558 396.58 327.588 402.516C327.325 402.516 326.997 402.651 326.603 402.921C323.974 402.921 322.659 400.492 322.659 395.636V395.231C322.659 390.644 324.631 387.541 328.574 385.922C360.121 370.813 376.223 319.954 376.88 233.345L345.728 245.081C330.086 250.747 321.213 254.39 319.11 256.009C316.218 256.009 313.392 254.255 310.632 250.747C307.872 246.97 304.06 239.82 299.196 229.297C294.333 218.775 291.901 211.625 291.901 207.847C291.901 204.07 292.887 202.181 294.859 202.181C295.779 202.181 296.436 202.586 296.831 203.396C297.356 204.205 298.342 206.633 299.788 210.68C303.468 221.203 311.092 226.464 322.659 226.464C327.654 226.464 345.728 222.552 376.88 214.728C377.011 199.079 377.077 185.048 377.077 172.637C377.077 160.226 376.617 150.917 375.697 144.712L373.134 145.521C355.52 150.648 338.367 153.211 321.673 153.211Z" fill="#FF0000"/>
		</svg>
		
		` );

	} else if ( node.class == "TGyo" ) {

		return new Title( `
		<svg width="1920" height="840" viewBox="0 0 1920 840" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1606.75 230C1612.2 230 1619.18 232.232 1627.7 236.697C1636.22 241.161 1643.67 247.858 1650.06 256.787C1656.69 265.716 1660 276.471 1660 289.053C1660 295.953 1658.82 301.026 1656.45 304.273C1654.32 307.52 1651.95 309.143 1649.35 309.143C1643.91 309.143 1639.65 303.664 1636.57 292.706C1633.49 282.153 1630.18 273.833 1626.63 267.745C1623.32 261.251 1618.47 254.555 1612.08 247.655C1610.89 246.437 1609.36 245.017 1607.46 243.393C1605.57 241.364 1604.15 239.741 1603.2 238.523C1602.26 237.306 1601.78 235.885 1601.78 234.262C1601.78 231.421 1603.44 230 1606.75 230ZM1608.17 396.81C1612.2 396.81 1616.93 398.839 1622.37 402.897C1628.05 406.55 1632.9 411.421 1636.93 417.508C1640.95 423.191 1642.96 429.076 1642.96 435.163C1642.96 439.628 1642.01 442.672 1640.12 444.295C1638.46 445.513 1636.1 446.122 1633.02 446.122C1627.58 446.122 1622.73 445.513 1618.47 444.295C1605.22 441.048 1583.21 439.425 1552.44 439.425C1544.16 439.425 1537.89 439.628 1533.63 440.034C1532.44 500.507 1527.95 551.646 1520.14 593.45C1512.33 635.254 1501.21 669.955 1486.77 697.554C1472.57 725.152 1454.59 748.286 1432.81 766.956C1430.45 768.985 1428.67 770 1427.49 770C1425.83 770 1425 768.985 1425 766.956C1425 764.115 1427.02 760.665 1431.04 756.607C1458.25 725.355 1478.13 684.16 1490.68 633.021C1503.45 581.477 1510.32 517.554 1511.26 441.251C1501.8 442.063 1494.7 442.875 1489.97 443.687L1482.51 444.904C1478.01 445.716 1469.49 447.339 1456.95 449.775C1457.19 488.737 1457.66 521.206 1458.37 547.181C1458.61 550.834 1458.73 555.096 1458.73 559.966C1458.73 581.071 1455.53 591.623 1449.14 591.623C1447.72 591.623 1445.95 589.797 1443.82 586.144C1441.69 582.086 1439.8 576.607 1438.14 569.707C1436.48 562.807 1435.65 555.096 1435.65 546.573C1435.65 544.543 1436.01 536.223 1436.72 521.612C1437.43 506.595 1437.78 493.405 1437.78 482.041C1437.78 469.865 1437.67 460.53 1437.43 454.036C1407.85 461.342 1388.09 467.227 1378.15 471.691C1373.18 474.126 1368.8 475.344 1365.01 475.344C1361.23 475.344 1356.73 472.909 1351.52 468.038C1346.32 463.168 1341.7 456.877 1337.68 449.166C1333.89 441.048 1332 434.149 1332 428.467C1332 426.032 1332.71 424.814 1334.13 424.814C1335.55 424.814 1338.63 427.046 1343.36 431.511C1345.73 433.946 1349.87 436.178 1355.78 438.207C1361.94 440.237 1368.8 441.251 1376.37 441.251C1383.24 441.251 1403.47 437.802 1437.07 430.902C1436.36 403.709 1435.54 385.445 1434.59 376.11C1432.46 358.253 1426.07 347.091 1415.42 342.627C1415.18 342.627 1413.88 342.221 1411.52 341.409C1409.39 340.192 1408.32 338.568 1408.32 336.539C1408.32 334.104 1410.21 331.872 1414 329.842C1418.02 327.407 1421.93 326.189 1425.71 326.189C1434.94 326.189 1443.11 328.828 1450.21 334.104C1457.31 338.974 1460.86 345.062 1460.86 352.368C1460.86 354.803 1460.15 358.658 1458.73 363.935C1457.54 369.211 1456.95 373.269 1456.95 376.11V416.9V427.249C1467.84 425.22 1479.43 423.393 1491.74 421.77L1511.26 419.944C1511.26 378.952 1510.67 350.135 1509.49 333.495C1508.31 318.072 1505.94 306.099 1502.39 297.576C1498.84 289.053 1493.16 282.153 1485.35 276.877C1482.98 275.254 1481.8 273.63 1481.8 272.007C1481.8 270.383 1482.63 268.76 1484.29 267.136C1488.55 262.266 1493.4 259.831 1498.84 259.831C1502.63 259.831 1507.95 261.86 1514.81 265.919C1521.91 269.572 1528.07 274.442 1533.27 280.53C1538.48 286.212 1541.08 292.097 1541.08 298.185C1541.08 302.649 1540.25 307.723 1538.6 313.405C1536.7 319.087 1535.52 324.769 1535.05 330.451C1534.34 338.568 1533.98 353.382 1533.98 374.893V402.289V418.117C1552.91 416.494 1567.82 414.87 1578.71 413.247C1582.97 412.435 1588.41 409.391 1595.04 404.115C1600.72 399.245 1605.1 396.81 1608.17 396.81ZM1575.87 288.444C1575.16 287.633 1573.98 286.415 1572.32 284.791C1570.66 283.168 1569.36 281.747 1568.42 280.53C1567.71 279.312 1567.35 278.095 1567.35 276.877C1567.35 274.036 1568.89 272.616 1571.97 272.616C1574.81 272.616 1580.6 274.848 1589.36 279.312C1598.35 283.371 1606.63 290.068 1614.21 299.403C1622.02 308.737 1625.92 320.71 1625.92 335.321C1625.92 342.627 1624.74 348.106 1622.37 351.759C1620.01 355.412 1617.17 357.238 1613.85 357.238C1611.49 357.238 1608.88 355.817 1606.04 352.976C1603.44 350.135 1601.55 345.874 1600.36 340.192C1598 328.422 1594.92 318.478 1591.13 310.361C1587.35 302.244 1582.26 294.938 1575.87 288.444Z" fill="white"/>
		<path d="M660.807 286C656.512 286 653.125 284.505 650.647 281.514C647.673 278.523 644.947 274.486 642.469 269.402C640.156 264.318 639 258.785 639 252.804C639 249.514 639.33 246.224 639.991 242.935C640.817 239.645 641.643 238 642.469 238C642.8 238 643.543 238.748 644.7 240.243C646.352 242.636 648.086 244.43 649.904 245.626C656.512 249.514 663.946 251.458 672.207 251.458C679.31 251.159 690.131 250.71 704.67 250.112C719.208 249.215 731.598 248.467 741.841 247.869C763.814 246.374 782.069 244.879 796.607 243.383C805.033 242.486 811.641 242.037 816.432 242.037C822.875 242.037 827.914 243.084 831.548 245.178C835.183 247.271 837 251.907 837 259.084C837 266.262 833.613 270.449 826.84 271.645C823.536 272.243 818.992 272.542 813.21 272.542L741.345 275.682C728.625 276.28 714.747 277.327 699.713 278.822C684.845 280.318 675.18 281.963 670.72 283.757C666.59 285.252 663.285 286 660.807 286Z" fill="white"/>
		<path d="M557.905 238C559.227 238 561.291 239.941 564.099 243.822C566.907 247.704 569.384 252.033 571.532 256.81C573.844 261.588 575 265.021 575 267.111C575 268.903 574.587 270.844 573.761 272.934C573.101 274.725 572.688 275.919 572.523 276.517C570.706 281.294 569.55 285.175 569.054 288.161C568.559 292.043 567.898 305.329 567.072 328.021C566.411 350.713 565.999 366.538 565.833 375.495V395.201C565.833 402.069 565.751 406.547 565.586 408.637C564.925 416.102 563.686 421.028 561.869 423.417C560.053 425.806 557.905 427 555.428 427C553.446 427 551.959 425.209 550.968 421.626C550.143 417.744 549.73 413.564 549.73 409.085V403.711L543.288 404.607C516.532 407.592 500.18 409.832 494.234 411.325L488.288 413.116C485.315 414.609 482.838 415.355 480.856 415.355C479.039 415.355 477.057 413.564 474.91 409.981C472.928 406.1 471.194 402.069 469.707 397.889C468.386 394.007 467.725 391.171 467.725 389.379C467.725 387.289 468.221 386.244 469.212 386.244C469.542 386.244 470.533 386.841 472.185 388.036C476.974 391.618 480.691 393.41 483.333 393.41C488.784 393.111 499.437 392.365 515.293 391.171C531.314 389.976 542.875 388.782 549.977 387.588C549.977 383.109 550.143 376.092 550.473 366.538L551.464 337.427C548.821 337.427 546.839 337.576 545.518 337.874C520.083 339.666 504.97 340.562 500.18 340.562C497.538 340.562 493.904 341.308 489.279 342.801C487.297 343.697 485.563 344.145 484.077 344.145C481.104 344.145 478.048 341.756 474.91 336.979C471.937 332.201 470.038 327.275 469.212 322.199C469.047 321.303 468.964 320.258 468.964 319.064C468.964 316.675 469.459 315.481 470.45 315.481C470.946 315.481 471.854 316.078 473.176 317.273C474.497 318.467 475.818 319.512 477.14 320.408C480.443 321.9 482.838 322.647 484.324 322.647C490.105 322.348 499.932 321.751 513.806 320.855C527.845 319.661 540.728 318.467 552.455 317.273C553.941 287.116 554.685 271.142 554.685 269.351C554.685 267.858 554.519 266.813 554.189 266.216C553.859 265.618 553.116 265.32 551.959 265.32C546.509 265.618 536.929 266.365 523.221 267.559C509.512 268.455 500.428 269.351 495.968 270.246C493.656 270.545 490.931 271.291 487.793 272.486C483.829 273.68 481.269 274.277 480.113 274.277C477.635 274.277 475.158 272.486 472.68 268.903C470.368 265.021 468.386 260.692 466.734 255.915C465.578 252.332 465 249.794 465 248.301C465 247.107 465.165 246.211 465.495 245.614C465.826 244.718 466.239 244.27 466.734 244.27C467.395 244.27 468.221 244.867 469.212 246.062C470.203 246.957 470.946 247.704 471.441 248.301C474.58 251.287 480.03 252.78 487.793 252.78C497.042 252.78 508.686 252.332 522.725 251.436C536.929 250.242 545.27 248.6 547.748 246.509C549.565 245.017 551.381 243.225 553.198 241.135C555.18 239.045 556.749 238 557.905 238Z" fill="white"/>
		<path d="M381.302 58C384.772 58 389.317 59.3452 394.937 62.0356C400.721 64.726 405.844 69.0605 410.307 75.0391C414.769 81.0178 417 88.6406 417 97.9075C417 102.391 416.174 105.68 414.521 107.772C413.034 109.865 411.381 110.911 409.563 110.911C406.423 110.911 403.613 107.473 401.134 100.598C398.159 92.5267 395.598 86.3986 393.449 82.2135C391.466 78.0285 388.408 73.8434 384.277 69.6584C383.285 68.7616 382.211 67.8648 381.054 66.968C380.062 66.0712 379.153 65.1744 378.327 64.2776C377.501 63.0818 377.087 62.0356 377.087 61.1388C377.087 59.0463 378.492 58 381.302 58ZM370.89 232.427C373.534 232.427 377.17 233.623 381.798 236.014C386.59 238.406 390.722 241.544 394.193 245.431C397.663 249.317 399.399 253.502 399.399 257.986C399.399 261.573 397.829 264.114 394.689 265.609C391.714 267.103 388.408 267.851 384.772 267.851C380.641 267.851 377.418 268 375.104 268.299C356.925 270.391 336.679 275.324 314.368 283.096C320.317 322.854 326.35 358.427 332.465 389.815C332.63 391.011 333.374 395.046 334.696 401.922C336.018 408.498 336.679 414.626 336.679 420.306C336.679 430.769 333.787 436 328.002 436C324.862 436 322.053 433.758 319.574 429.274C317.26 425.089 315.69 419.858 314.863 413.58C314.037 407.601 312.55 394.598 310.401 374.569L304.699 324.797L300.237 288.028C273.629 298.491 256.028 308.505 247.434 318.071C244.293 321.359 240.988 323.004 237.517 323.004C232.229 323.004 227.353 319.865 222.891 313.587C218.594 307.31 215.123 301.182 212.479 295.203C210.826 291.317 210 288.626 210 287.132C210 285.039 210.744 283.993 212.231 283.993C213.223 283.993 214.132 284.142 214.958 284.441C215.95 284.74 216.859 285.039 217.685 285.338C226.61 287.431 232.89 288.477 236.526 288.477C240.492 288.477 248.26 286.833 259.829 283.544C271.398 279.957 284.123 275.623 298.006 270.541C294.205 237.957 290.899 211.053 288.09 189.829C273.381 196.107 261.812 201.936 253.383 207.317C251.896 208.512 250.243 209.11 248.425 209.11C242.31 209.11 235.617 201.637 228.345 186.69C226.527 182.804 225.618 179.964 225.618 178.171C225.618 176.676 226.031 175.929 226.857 175.929C227.684 175.929 228.841 176.377 230.328 177.274C234.625 180.263 239.996 181.758 246.442 181.758C250.078 181.758 255.532 180.861 262.804 179.068C270.075 176.975 277.678 174.434 285.611 171.445C282.471 147.231 280.405 132.584 279.413 127.502C276.934 114.648 274.372 106.427 271.728 102.84C269.249 98.9537 265.613 97.0107 260.82 97.0107C259.333 97.0107 258.259 96.8612 257.598 96.5623C256.937 96.2633 256.606 95.3665 256.606 93.8719C256.606 91.1815 258.176 88.1922 261.316 84.9039C264.622 81.3167 267.927 78.9253 271.232 77.7295C272.224 77.4306 273.711 77.2811 275.695 77.2811C280.487 77.2811 284.867 78.9253 288.834 82.2135C292.965 85.5018 295.031 90.1352 295.031 96.1139C295.031 97.6085 294.783 100.448 294.287 104.633C293.792 108.52 293.544 112.256 293.544 115.843C293.544 123.915 295.114 140.804 298.254 166.512C309.327 162.028 317.508 157.694 322.796 153.509C323.623 152.911 326.102 150.52 330.234 146.335C332.217 144.242 333.869 142.747 335.192 141.851C336.679 140.655 338.414 140.057 340.398 140.057C344.364 140.057 348.826 142 353.784 145.886C358.743 149.473 361.222 153.658 361.222 158.441C361.222 161.431 360.23 163.822 358.247 165.616C356.263 167.409 354.363 168.456 352.545 168.754C340.645 170.548 323.292 175.929 300.485 184.897C304.121 213.594 307.84 240.498 311.641 265.609C329.325 259.032 341.968 253.651 349.57 249.466C353.041 247.673 355.602 245.58 357.255 243.189C359.073 240.797 360.147 239.452 360.478 239.153C362.296 236.762 363.866 235.117 365.188 234.221C366.51 233.025 368.411 232.427 370.89 232.427ZM362.957 101.943C362.461 101.345 361.635 100.448 360.478 99.2527C359.321 98.0569 358.412 97.0107 357.751 96.1139C357.255 95.2171 357.007 94.3203 357.007 93.4235C357.007 91.6299 358.081 90.7331 360.23 90.7331C362.213 90.7331 366.18 92.2278 372.129 95.2171C378.244 98.2064 383.863 102.989 388.987 109.566C394.275 116.142 396.92 124.662 396.92 135.125C396.92 139.907 396.176 143.644 394.689 146.335C393.201 148.726 391.383 149.922 389.235 149.922C384.607 149.922 381.384 146.036 379.566 138.263C377.748 130.192 375.517 123.167 372.873 117.189C370.394 111.21 367.089 106.128 362.957 101.943Z" fill="white"/>
		</svg>
		` );

	} else if ( node.class == "MTitle" ) {

		return new MainTitle();

	}

	const baseEntity = new GLP.Entity();

	return baseEntity;

};
