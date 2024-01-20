export interface Theme {
	COLORS: {
		BACKGROUND_CARD: string;
		BACKGROUND: string;
		BUTTON: string;
		BUTTON_TEXT: string;
		TEXT: string;
		ICON: string;
		PRIMARY: string;
		WHITE: string;
		POST_TITLE: string;
		POST_CONTENT: string;
		OVERLAY: string;
	};
	MAP_STYLE: any[];
}

export const themes: { light: Theme; dark: Theme } = {
	light: {
		COLORS: {
			BACKGROUND_CARD: "#F0F2F5",
			BACKGROUND: "#E4E6EF",
			BUTTON: "#9f0a2f",
			BUTTON_TEXT: "#FFF",
			TEXT: "#a1a1a1",
			ICON: "#333",
			PRIMARY: "#800020",
			WHITE: "#FFF",
			POST_TITLE: "#333",
			POST_CONTENT: "#555",
			OVERLAY: "rgba(0,0,0,0.6)",
		},
		MAP_STYLE: []
	},
	dark: {
		COLORS: {
			BACKGROUND_CARD: "#222",
			BACKGROUND: "#111",
			BUTTON: "#9f0a2f",
			BUTTON_TEXT: "#FFF",
			TEXT: "#a1a1a1",
			ICON: "#FFF",
			PRIMARY: "#800020",
			WHITE: "#FFF",
			POST_TITLE: "#FFF",
			POST_CONTENT: "#DDD",
			OVERLAY: "rgba(0,0,0,0.8)",
		},
		MAP_STYLE:
			[
				{
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#242f3e"
						}
					]
				},
				{
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#746855"
						}
					]
				},
				{
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"color": "#242f3e"
						}
					]
				},
				{
					"featureType": "administrative.locality",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#d59563"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#d59563"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#263c3f"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#6b9a76"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#38414e"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#212a37"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#9ca5b3"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#746855"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#1f2835"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#f3d19c"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#2f3948"
						}
					]
				},
				{
					"featureType": "transit.station",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#d59563"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#17263c"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#515c6d"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"color": "#17263c"
						}
					]
				}
			]
	},
};
