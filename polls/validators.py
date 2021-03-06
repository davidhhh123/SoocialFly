import re

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _

class UpperLowercaseValidator(object):
    def validate(self, password, user=None):
        if not re.findall('[A-Z]', password):
            raise ValidationError(
                _(""),
                code='password_no_upper',
            )

        if not re.findall('[a-z]', password):
            raise ValidationError(
                _(""),
                code='password_no_lower',
            )

    def get_help_text(self):
        return _(
            "Must use of both uppercase and lowercase letters"
        )


class SymbolValidator(object):
    def validate(self, password, user=None):
        if not re.findall('', password):
            raise ValidationError(
                _(""),
                code='password_no_symbol',
            )

    def get_help_text(self):
        return _(
            ""
        )


class AtLeastOneNumber(object):
    def validate(self, password, user=None):
        if not re.findall('[0-9]', password):
            raise ValidationError(
                _("The password ust include of one or more numerical digits"),
                code='password_no_numbers',
            )

    def get_help_text(self):
        return _(
            "Must include of one or more numerical digits"
        )
