import { FormControl, FormGroup } from '@angular/forms';
export function validateForm(form: FormGroup) {
  for (const i in form.controls) {
    form.controls[i].markAsDirty();
    form.controls[i].updateValueAndValidity();
  }
  return form.invalid;
}
