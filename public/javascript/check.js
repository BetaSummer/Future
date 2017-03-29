function check(f) {
	var Rname = /^[\u4e00-\u9fa5]{2,4}$/;
	var Rnumber = /^\d{8}$/;
	var Remail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var Rphone=/^1\d{10}$|^[1-9]\d{5}$/;
	//错误信息
	if (!Rname.test(f.name.value)) {
		console.log(f.name.value);
		Materialize.toast("姓名格式有误", 2000);
		f.name.focus();
		return false;
	}
	if (!Rphone.test(f.phone.value)) {
		console.log(f.phone.value);
		Materialize.toast("手机格式有误", 2000);
		f.phone.focus();
		return false;
	}
	if (!Rnumber.test(f.stuNum.value)) {
		console.log(f.stuNum.value);
		Materialize.toast("学号格式有误", 2000);
		f.stuNum.focus();
		return false;
	}
	if (!Remail.test(f.email.value)) {
		console.log(f.email.value);
		Materialize.toast("邮箱格式有误", 2000);
		f.email.focus();
		return false;
	}
	if (f.introduction.value.length === 0 || f.experience.value.length === 0) {
		var emptyEle;
		console.log(f.introduction.value);
		Materialize.toast("该项不能为空", 2000);
		emptyEle = f.introduction.value.length === 0 ? f.introduction : f.experience;
		emptyEle.focus();
		return false;
	}
	if (f.introduction.value.length > 200 || f.experience.value.length > 200) {
		var wrongEle;
		console.log(f.experience.value);
		Materialize.toast("该项字数不能超过200", 2000);
		wrongEle = f.introduction.value.length > 200 ? f.introduction : f.experience;
		wrongEle.focus();
		return false;
	}
	return true;
}