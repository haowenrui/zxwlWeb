export default (menus, data) => {
	data.forEach((item => {
        const menuSrc = Object.assign({}, item);
		let menuItem = {
			path: '',
			noDropdown: true,
			children: [],
			name: menuSrc.label
        }
		if (menuSrc.children) {
			menuItem.noDropdown = false;
			menuSrc.children.forEach(child => {
				menuItem.children.push({
					path: '/' + child.object.url,
					name: child.label
				});
			})
		} else {
            menuItem.noDropdown = true;
            menuItem.path = '/' + menuSrc.object.url;
		}
		menus.push(menuItem);
	}));
}
