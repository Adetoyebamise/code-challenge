import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError
# address = 'Robie House, 5757 South Woodlawn Avenue, Chicago, IL 60637'

class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.
        address = request.query_params.get("address",None)
        print(address)
        if address:
            response = {'input_string':address}
            obj = {}
            address_components, address_type = self.parse(address)
            if address_type is 'Ambiguous':
                response['error'] = 'Unknown address'
                return Response(response, status=400)
            for x in address_components:
                obj[x[1]]=x[0]
            response['address_components'] = address_components
            response['address_type'] = address_type
            return Response(response)
        return Response(status=400)

    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        address_components, address_type = usaddress.tag(address)
        return address_components, address_type
